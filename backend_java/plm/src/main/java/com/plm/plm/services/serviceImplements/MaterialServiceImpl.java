package com.plm.plm.services.serviceImplements;

import com.plm.plm.Config.exception.ResourceNotFoundException;
import com.plm.plm.dto.ProductDTO;
import com.plm.plm.Enums.EstadoUsuario;
import com.plm.plm.Enums.TipoProducto;
import com.plm.plm.Models.Product;
import com.plm.plm.Reposotory.ProductRepository;
import com.plm.plm.services.MaterialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MaterialServiceImpl implements MaterialService {

    @Autowired
    private ProductRepository productRepository;

    @Override
    @Transactional(readOnly = true)
    public List<ProductDTO> getAllMaterials() {
        List<Product> materials = productRepository.findAll()
                .stream()
                .filter(p -> (p.getTipo() == TipoProducto.MATERIA_PRIMA || 
                             p.getTipo() == TipoProducto.COMPONENTE) &&
                             p.getEstado() == EstadoUsuario.ACTIVO)
                .collect(Collectors.toList());
        
        return materials.stream()
                .map(this::productToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProductDTO> getMaterialsByTipo(TipoProducto tipo) {
        if (tipo != TipoProducto.MATERIA_PRIMA && tipo != TipoProducto.COMPONENTE) {
            throw new IllegalArgumentException("El tipo debe ser MATERIA_PRIMA o COMPONENTE");
        }
        
        List<Product> materials = productRepository.findByTipoAndEstado(tipo, EstadoUsuario.ACTIVO);
        return materials.stream()
                .map(this::productToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProductDTO> getMaterialsByCategoria(String categoria) {
        List<Product> materials = productRepository.findByCategoriaAndEstado(categoria, EstadoUsuario.ACTIVO)
                .stream()
                .filter(p -> p.getTipo() == TipoProducto.MATERIA_PRIMA || 
                            p.getTipo() == TipoProducto.COMPONENTE)
                .collect(Collectors.toList());
        
        return materials.stream()
                .map(this::productToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public ProductDTO getMaterialById(Integer id) {
        Product material = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Material no encontrado"));

        if (material.getEstado() != EstadoUsuario.ACTIVO) {
            throw new ResourceNotFoundException("Material no encontrado");
        }

        if (material.getTipo() != TipoProducto.MATERIA_PRIMA && 
            material.getTipo() != TipoProducto.COMPONENTE) {
            throw new ResourceNotFoundException("El producto no es un material");
        }

        return productToDTO(material);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProductDTO> searchMaterials(String search) {
        List<Product> materials = productRepository.findByNombreOrCodigoContaining(
                search.trim(), EstadoUsuario.ACTIVO)
                .stream()
                .filter(p -> p.getTipo() == TipoProducto.MATERIA_PRIMA || 
                            p.getTipo() == TipoProducto.COMPONENTE)
                .collect(Collectors.toList());
        
        return materials.stream()
                .map(this::productToDTO)
                .collect(Collectors.toList());
    }

    private ProductDTO productToDTO(Product product) {
        ProductDTO dto = new ProductDTO();
        dto.setId(product.getId());
        dto.setCodigo(product.getCodigo());
        dto.setNombre(product.getNombre());
        dto.setDescripcion(product.getDescripcion());
        dto.setCategoria(product.getCategoria());
        dto.setCategoriaId(product.getCategoriaEntity() != null ? 
                         product.getCategoriaEntity().getId() : null);
        dto.setTipo(product.getTipo());
        dto.setUnidadMedida(product.getUnidadMedida());
        dto.setEstado(product.getEstado());
        dto.setCreatedAt(product.getCreatedAt());
        dto.setUpdatedAt(product.getUpdatedAt());
        return dto;
    }
}

