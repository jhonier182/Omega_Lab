package com.plm.plm.services.serviceImplements;

import com.plm.plm.Config.GlobalExceptions.BadRequestException;
import com.plm.plm.Config.GlobalExceptions.ConflictException;
import com.plm.plm.Config.GlobalExceptions.ResourceNotFoundException;
import com.plm.plm.DTO.*;
import com.plm.plm.Enums.EstadoBOM;
import com.plm.plm.Enums.EstadoUsuario;
import com.plm.plm.Enums.TipoProducto;
import com.plm.plm.Models.BOM;
import com.plm.plm.Models.BOMItem;
import com.plm.plm.Models.Product;
import com.plm.plm.Models.User;
import com.plm.plm.Reposotory.BOMItemRepository;
import com.plm.plm.Reposotory.BOMRepository;
import com.plm.plm.Reposotory.ProductRepository;
import com.plm.plm.Reposotory.UserRepository;
import com.plm.plm.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private BOMRepository bomRepository;

    @Autowired
    private BOMItemRepository bomItemRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    @Transactional
    public ProductResponse createProduct(ProductRequest request) {
        if (productRepository.existsByCodigo(request.getCodigo())) {
            throw new ConflictException("El código del producto ya existe");
        }

        Product product = new Product();
        product.setCodigo(request.getCodigo());
        product.setNombre(request.getNombre());
        product.setDescripcion(request.getDescripcion() != null ? request.getDescripcion() : "");
        product.setCategoria(request.getCategoria() != null ? request.getCategoria() : "");
        product.setTipo(request.getTipo() != null ? request.getTipo() : TipoProducto.PRODUCTO_TERMINADO);
        product.setUnidadMedida(request.getUnidadMedida() != null ? request.getUnidadMedida() : "un");
        product.setEstado(EstadoUsuario.ACTIVO);

        product = productRepository.save(product);

        return productToDTO(product);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProductResponse> getAllProducts(String tipo, String categoria, String search) {
        List<Product> products;

        if (search != null && !search.trim().isEmpty()) {
            products = productRepository.findByNombreOrCodigoContaining(
                search.trim(),
                EstadoUsuario.ACTIVO
            );
        } else if (tipo != null && categoria != null) {
            TipoProducto tipoEnum = TipoProducto.fromString(tipo);
            products = productRepository.findByTipoAndEstado(tipoEnum, EstadoUsuario.ACTIVO)
                .stream()
                .filter(p -> categoria.equals(p.getCategoria()))
                .collect(Collectors.toList());
        } else if (tipo != null) {
            TipoProducto tipoEnum = TipoProducto.fromString(tipo);
            products = productRepository.findByTipoAndEstado(tipoEnum, EstadoUsuario.ACTIVO);
        } else if (categoria != null) {
            products = productRepository.findByCategoriaAndEstado(categoria, EstadoUsuario.ACTIVO);
        } else {
            products = productRepository.findAll()
                .stream()
                .filter(p -> p.getEstado() == EstadoUsuario.ACTIVO)
                .collect(Collectors.toList());
        }

        return products.stream()
            .map(this::productToDTO)
            .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public Map<String, Object> getProductById(Integer id) {
        Product product = productRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Producto no encontrado"));

        if (product.getEstado() != EstadoUsuario.ACTIVO) {
            throw new ResourceNotFoundException("Producto no encontrado");
        }

        ProductResponse productResponse = productToDTO(product);

        BOM bom = bomRepository.findFirstByProductoIdAndEstadoOrderByVersionDesc(
            id, EstadoBOM.APROBADO
        ).orElse(null);

        if (bom == null) {
            bom = bomRepository.findFirstByProductoIdAndEstadoOrderByVersionDesc(
                id, EstadoBOM.BORRADOR
            ).orElse(null);
        }

        Map<String, Object> result = new HashMap<>();
        result.put("product", productResponse);
        
        if (bom != null) {
            List<BOMItem> items = bomItemRepository.findByBomIdOrderBySecuenciaAsc(bom.getId());
            bom.setItems(items);
            result.put("bom", bomToDTO(bom));
        } else {
            result.put("bom", null);
        }

        return result;
    }

    @Override
    @Transactional
    public ProductResponse updateProduct(Integer id, ProductRequest request) {
        Product product = productRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Producto no encontrado"));

        if (product.getEstado() != EstadoUsuario.ACTIVO) {
            throw new ResourceNotFoundException("Producto no encontrado");
        }

        if (request.getCodigo() != null && !request.getCodigo().equals(product.getCodigo())) {
            if (productRepository.existsByCodigo(request.getCodigo())) {
                throw new ConflictException("El código del producto ya existe");
            }
            product.setCodigo(request.getCodigo());
        }

        if (request.getNombre() != null) {
            product.setNombre(request.getNombre());
        }
        if (request.getDescripcion() != null) {
            product.setDescripcion(request.getDescripcion());
        }
        if (request.getCategoria() != null) {
            product.setCategoria(request.getCategoria());
        }
        if (request.getTipo() != null) {
            product.setTipo(request.getTipo());
        }
        if (request.getUnidadMedida() != null) {
            product.setUnidadMedida(request.getUnidadMedida());
        }

        product = productRepository.save(product);
        return productToDTO(product);
    }

    @Override
    @Transactional
    public BOMResponse createOrUpdateBOM(Integer productoId, BOMRequest request, Integer userId) {
        Product product = productRepository.findById(productoId)
            .orElseThrow(() -> new ResourceNotFoundException("Producto no encontrado"));

        if (product.getEstado() != EstadoUsuario.ACTIVO) {
            throw new ResourceNotFoundException("Producto no encontrado");
        }

        BOM bom = bomRepository.findByProductoIdAndEstado(productoId, EstadoBOM.BORRADOR)
            .stream()
            .findFirst()
            .orElse(null);

        if (bom == null) {
            List<BOM> lastBoms = bomRepository.findByProductoIdOrderByVersionDesc(productoId);
            String version = lastBoms.isEmpty() ? "1.0" : getNextVersion(lastBoms.get(0).getVersion());

            bom = new BOM();
            bom.setProducto(product);
            bom.setVersion(version);
            bom.setJustificacion(request.getJustificacion() != null ? request.getJustificacion() : "");
            bom.setEstado(EstadoBOM.BORRADOR);
            User creador = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado"));
            bom.setCreador(creador);
        } else {
            bom.setJustificacion(request.getJustificacion() != null ? request.getJustificacion() : bom.getJustificacion());
        }

        bom = bomRepository.save(bom);
        return bomToDTO(bom);
    }

    @Override
    @Transactional
    public BOMItemResponse addMaterialToBOM(Integer bomId, BOMItemRequest request) {
        BOM bom = bomRepository.findById(bomId)
            .orElseThrow(() -> new ResourceNotFoundException("BOM no encontrado"));

        Product material = productRepository.findById(request.getMaterialId())
            .orElseThrow(() -> new ResourceNotFoundException("Material no encontrado"));

        if (material.getEstado() != EstadoUsuario.ACTIVO) {
            throw new ResourceNotFoundException("Material no encontrado");
        }

        Integer maxSeq = bomItemRepository.findMaxSecuenciaByBomId(bomId);
        Integer nextSeq = (maxSeq != null ? maxSeq : 0) + 1;

        BOMItem item = new BOMItem();
        item.setBom(bom);
        item.setMaterial(material);
        item.setCantidad(request.getCantidad());
        item.setUnidad(request.getUnidad() != null ? request.getUnidad() : "mg");
        item.setPorcentaje(request.getPorcentaje() != null ? request.getPorcentaje() : BigDecimal.ZERO);
        item.setSecuencia(nextSeq);

        item = bomItemRepository.save(item);

        return bomItemToDTO(item);
    }

    @Override
    @Transactional(readOnly = true)
    public BOMResponse getBOMWithItems(Integer bomId) {
        BOM bom = bomRepository.findById(bomId)
            .orElseThrow(() -> new ResourceNotFoundException("BOM no encontrado"));

        List<BOMItem> items = bomItemRepository.findByBomIdOrderBySecuenciaAsc(bomId);
        bom.setItems(items);

        return bomToDTO(bom);
    }

    @Override
    @Transactional
    public BOMItemResponse updateBOMItem(Integer itemId, BOMItemRequest request) {
        BOMItem item = bomItemRepository.findById(itemId)
            .orElseThrow(() -> new ResourceNotFoundException("Item no encontrado"));

        if (request.getCantidad() != null) {
            item.setCantidad(request.getCantidad());
        }
        if (request.getUnidad() != null) {
            item.setUnidad(request.getUnidad());
        }
        if (request.getPorcentaje() != null) {
            item.setPorcentaje(request.getPorcentaje());
        }
        if (request.getMaterialId() != null) {
            Product material = productRepository.findById(request.getMaterialId())
                .orElseThrow(() -> new ResourceNotFoundException("Material no encontrado"));
            item.setMaterial(material);
        }

        item = bomItemRepository.save(item);
        return bomItemToDTO(item);
    }

    @Override
    @Transactional
    public void deleteBOMItem(Integer itemId) {
        BOMItem item = bomItemRepository.findById(itemId)
            .orElseThrow(() -> new ResourceNotFoundException("Item no encontrado"));

        bomItemRepository.delete(item);
    }

    @Override
    @Transactional(readOnly = true)
    public BOMHistoryResponse getBOMHistory(Integer productoId) {
        List<BOM> boms = bomRepository.findByProductoIdOrderByVersionDesc(productoId);

        List<BOMResponse> history = boms.stream()
            .map(this::bomToDTO)
            .collect(Collectors.toList());

        return new BOMHistoryResponse(history);
    }

    private String getNextVersion(String currentVersion) {
        String[] parts = currentVersion.split("\\.");
        int major = parts.length > 0 ? Integer.parseInt(parts[0]) : 1;
        int minor = parts.length > 1 ? Integer.parseInt(parts[1]) : 0;
        return major + "." + (minor + 1);
    }

    private ProductResponse productToDTO(Product product) {
        ProductResponse dto = new ProductResponse();
        dto.setId(product.getId());
        dto.setCodigo(product.getCodigo());
        dto.setNombre(product.getNombre());
        dto.setDescripcion(product.getDescripcion());
        dto.setCategoria(product.getCategoria());
        dto.setTipo(product.getTipo());
        dto.setUnidadMedida(product.getUnidadMedida());
        dto.setEstado(product.getEstado());
        dto.setCreatedAt(product.getCreatedAt());
        dto.setUpdatedAt(product.getUpdatedAt());
        return dto;
    }

    private BOMResponse bomToDTO(BOM bom) {
        BOMResponse dto = new BOMResponse();
        dto.setId(bom.getId());
        dto.setProductoId(bom.getProducto().getId());
        dto.setVersion(bom.getVersion());
        dto.setEstado(bom.getEstado());
        dto.setJustificacion(bom.getJustificacion());
        dto.setCreatedBy(bom.getCreador() != null ? bom.getCreador().getId() : null);
        dto.setApprovedBy(bom.getAprobador() != null ? bom.getAprobador().getId() : null);
        dto.setApprovedAt(bom.getApprovedAt());
        dto.setCreatedAt(bom.getCreatedAt());
        dto.setUpdatedAt(bom.getUpdatedAt());

        if (bom.getItems() != null) {
            List<BOMItemResponse> items = bom.getItems().stream()
                .map(this::bomItemToDTO)
                .collect(Collectors.toList());
            dto.setItems(items);
        }

        return dto;
    }

    private BOMItemResponse bomItemToDTO(BOMItem item) {
        BOMItemResponse dto = new BOMItemResponse();
        dto.setId(item.getId());
        dto.setBomId(item.getBom().getId());
        dto.setMaterialId(item.getMaterial().getId());
        dto.setMaterialNombre(item.getMaterial().getNombre());
        dto.setMaterialCodigo(item.getMaterial().getCodigo());
        dto.setMaterialUnidadMedida(item.getMaterial().getUnidadMedida());
        dto.setCantidad(item.getCantidad());
        dto.setUnidad(item.getUnidad());
        dto.setPorcentaje(item.getPorcentaje());
        dto.setSecuencia(item.getSecuencia());
        dto.setCreatedAt(item.getCreatedAt());
        return dto;
    }
}

