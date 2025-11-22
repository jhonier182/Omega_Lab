package com.plm.plm.services.serviceImplements;

import com.plm.plm.Config.exception.ConflictException;
import com.plm.plm.Config.exception.ResourceNotFoundException;
import com.plm.plm.dto.MaterialDTO;
import com.plm.plm.Enums.EstadoUsuario;
import com.plm.plm.Models.Category;
import com.plm.plm.Models.Material;
import com.plm.plm.Reposotory.CategoryRepository;
import com.plm.plm.Reposotory.MaterialRepository;
import com.plm.plm.services.MaterialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MaterialServiceImpl implements MaterialService {

    @Autowired
    private MaterialRepository materialRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    @Transactional
    public MaterialDTO createMaterial(MaterialDTO materialDTO) {
        validateMaterialDTO(materialDTO);

        if (materialRepository.existsByCodigo(materialDTO.getCodigo())) {
            throw new ConflictException("El código del material ya existe");
        }

        Material material = new Material();
        material.setCodigo(materialDTO.getCodigo());
        material.setNombre(materialDTO.getNombre());
        material.setDescripcion(materialDTO.getDescripcion() != null ? materialDTO.getDescripcion() : "");
        material.setCategoria(materialDTO.getCategoria() != null ? materialDTO.getCategoria() : "");
        material.setUnidadMedida(materialDTO.getUnidadMedida() != null ? materialDTO.getUnidadMedida() : "kg");
        material.setEstado(EstadoUsuario.ACTIVO);

        if (materialDTO.getCategoriaId() != null) {
            Category category = categoryRepository.findById(materialDTO.getCategoriaId())
                .orElse(null);
            if (category != null && category.getTipoProducto().name().contains("MATERIA_PRIMA")) {
                material.setCategoriaEntity(category);
            }
        }

        material = materialRepository.save(material);

        return materialToDTO(material);
    }

    @Override
    @Transactional(readOnly = true)
    public List<MaterialDTO> getAllMaterials() {
        List<Material> materials = materialRepository.findByEstado(EstadoUsuario.ACTIVO);
        return materials.stream()
                .map(this::materialToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<MaterialDTO> getMaterialsByCategoria(String categoria) {
        List<Material> materials = materialRepository.findByCategoriaAndEstado(categoria, EstadoUsuario.ACTIVO);
        return materials.stream()
                .map(this::materialToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public MaterialDTO getMaterialById(Integer id) {
        Material material = materialRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Material no encontrado"));

        if (material.getEstado() != EstadoUsuario.ACTIVO) {
            throw new ResourceNotFoundException("Material no encontrado");
        }

        return materialToDTO(material);
    }

    @Override
    @Transactional
    public MaterialDTO updateMaterial(Integer id, MaterialDTO materialDTO) {
        Material material = materialRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Material no encontrado"));

        if (material.getEstado() != EstadoUsuario.ACTIVO) {
            throw new ResourceNotFoundException("Material no encontrado");
        }

        if (materialDTO.getCodigo() != null && !materialDTO.getCodigo().trim().isEmpty()) {
            if (!materialDTO.getCodigo().equals(material.getCodigo()) && 
                materialRepository.existsByCodigo(materialDTO.getCodigo())) {
                throw new ConflictException("El código del material ya existe");
            }
            material.setCodigo(materialDTO.getCodigo());
        }

        if (materialDTO.getNombre() != null && !materialDTO.getNombre().trim().isEmpty()) {
            if (materialDTO.getNombre().trim().length() < 2) {
                throw new com.plm.plm.Config.exception.BadRequestException("El nombre debe tener al menos 2 caracteres");
            }
            material.setNombre(materialDTO.getNombre());
        }

        if (materialDTO.getDescripcion() != null) {
            material.setDescripcion(materialDTO.getDescripcion());
        }

        if (materialDTO.getCategoria() != null) {
            material.setCategoria(materialDTO.getCategoria());
        }

        if (materialDTO.getCategoriaId() != null) {
            Category category = categoryRepository.findById(materialDTO.getCategoriaId())
                .orElse(null);
            if (category != null && category.getTipoProducto().name().contains("MATERIA_PRIMA")) {
                material.setCategoriaEntity(category);
            }
        }

        if (materialDTO.getUnidadMedida() != null && !materialDTO.getUnidadMedida().trim().isEmpty()) {
            material.setUnidadMedida(materialDTO.getUnidadMedida());
        }

        material = materialRepository.save(material);
        return materialToDTO(material);
    }

    @Override
    @Transactional
    public void deleteMaterial(Integer id) {
        Material material = materialRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Material no encontrado"));

        material.setEstado(EstadoUsuario.INACTIVO);
        materialRepository.save(material);
    }

    @Override
    @Transactional(readOnly = true)
    public List<MaterialDTO> searchMaterials(String search) {
        List<Material> materials = materialRepository.findByNombreOrCodigoContaining(
                search.trim(), EstadoUsuario.ACTIVO);
        return materials.stream()
                .map(this::materialToDTO)
                .collect(Collectors.toList());
    }

    private void validateMaterialDTO(MaterialDTO materialDTO) {
        if (materialDTO.getCodigo() == null || materialDTO.getCodigo().trim().isEmpty()) {
            throw new com.plm.plm.Config.exception.BadRequestException("El código del material es requerido");
        }

        if (materialDTO.getNombre() == null || materialDTO.getNombre().trim().isEmpty()) {
            throw new com.plm.plm.Config.exception.BadRequestException("El nombre del material es requerido");
        }

        if (materialDTO.getNombre().trim().length() < 2) {
            throw new com.plm.plm.Config.exception.BadRequestException("El nombre debe tener al menos 2 caracteres");
        }
    }

    private MaterialDTO materialToDTO(Material material) {
        MaterialDTO dto = new MaterialDTO();
        dto.setId(material.getId());
        dto.setCodigo(material.getCodigo());
        dto.setNombre(material.getNombre());
        dto.setDescripcion(material.getDescripcion());
        dto.setCategoria(material.getCategoria());
        dto.setCategoriaId(material.getCategoriaEntity() != null ? material.getCategoriaEntity().getId() : null);
        dto.setUnidadMedida(material.getUnidadMedida());
        dto.setEstado(material.getEstado());
        dto.setCreatedAt(material.getCreatedAt());
        dto.setUpdatedAt(material.getUpdatedAt());
        return dto;
    }
}
