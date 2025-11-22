package com.plm.plm.services.serviceImplements;

import com.plm.plm.Config.exception.ConflictException;
import com.plm.plm.Config.exception.ResourceNotFoundException;
import com.plm.plm.dto.CategoryDTO;
import com.plm.plm.Enums.EstadoUsuario;
import com.plm.plm.Enums.TipoProducto;
import com.plm.plm.Models.Category;
import com.plm.plm.Reposotory.CategoryRepository;
import com.plm.plm.services.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    @Transactional
    public CategoryDTO createCategory(CategoryDTO categoryDTO) {
        validateCategoryDTO(categoryDTO);

        if (categoryRepository.existsByNombre(categoryDTO.getNombre())) {
            throw new ConflictException("La categoría con ese nombre ya existe");
        }

        Category category = new Category();
        category.setNombre(categoryDTO.getNombre());
        category.setDescripcion(categoryDTO.getDescripcion() != null ? categoryDTO.getDescripcion() : "");
        category.setTipoProducto(categoryDTO.getTipoProducto());
        category.setEstado(EstadoUsuario.ACTIVO);

        category = categoryRepository.save(category);
        return categoryToDTO(category);
    }

    private void validateCategoryDTO(CategoryDTO categoryDTO) {
        if (categoryDTO.getNombre() == null || categoryDTO.getNombre().trim().isEmpty()) {
            throw new com.plm.plm.Config.exception.BadRequestException("El nombre de la categoría es requerido");
        }

        if (categoryDTO.getTipoProducto() == null) {
            throw new com.plm.plm.Config.exception.BadRequestException("El tipo de producto es requerido");
        }
    }

    @Override
    @Transactional(readOnly = true)
    public List<CategoryDTO> getAllCategories() {
        List<Category> categories = categoryRepository.findByEstado(EstadoUsuario.ACTIVO);
        return categories.stream()
                .map(this::categoryToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<CategoryDTO> getCategoriesByTipoProducto(TipoProducto tipoProducto) {
        List<Category> categories = categoryRepository.findByTipoProductoAndEstado(tipoProducto, EstadoUsuario.ACTIVO);
        return categories.stream()
                .map(this::categoryToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public CategoryDTO getCategoryById(Integer id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Categoría no encontrada"));
        
        if (category.getEstado() != EstadoUsuario.ACTIVO) {
            throw new ResourceNotFoundException("Categoría no encontrada");
        }
        
        return categoryToDTO(category);
    }

    @Override
    @Transactional
    public CategoryDTO updateCategory(Integer id, CategoryDTO categoryDTO) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Categoría no encontrada"));

        if (category.getEstado() != EstadoUsuario.ACTIVO) {
            throw new ResourceNotFoundException("Categoría no encontrada");
        }

        if (categoryDTO.getNombre() == null || categoryDTO.getNombre().trim().isEmpty()) {
            throw new com.plm.plm.Config.exception.BadRequestException("El nombre de la categoría es requerido");
        }

        if (categoryDTO.getTipoProducto() == null) {
            throw new com.plm.plm.Config.exception.BadRequestException("El tipo de producto es requerido");
        }

        if (!category.getNombre().equals(categoryDTO.getNombre()) && 
            categoryRepository.existsByNombre(categoryDTO.getNombre())) {
            throw new ConflictException("La categoría con ese nombre ya existe");
        }

        category.setNombre(categoryDTO.getNombre());
        category.setDescripcion(categoryDTO.getDescripcion() != null ? categoryDTO.getDescripcion() : "");
        category.setTipoProducto(categoryDTO.getTipoProducto());

        category = categoryRepository.save(category);
        return categoryToDTO(category);
    }

    @Override
    @Transactional
    public void deleteCategory(Integer id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Categoría no encontrada"));

        category.setEstado(EstadoUsuario.INACTIVO);
        categoryRepository.save(category);
    }

    private CategoryDTO categoryToDTO(Category category) {
        CategoryDTO dto = new CategoryDTO();
        dto.setId(category.getId());
        dto.setNombre(category.getNombre());
        dto.setDescripcion(category.getDescripcion());
        dto.setTipoProducto(category.getTipoProducto());
        dto.setEstado(category.getEstado());
        dto.setCreatedAt(category.getCreatedAt());
        dto.setUpdatedAt(category.getUpdatedAt());
        return dto;
    }
}

