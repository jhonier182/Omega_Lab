package com.plm.plm.Controllers;

import com.plm.plm.dto.ApiResponseDTO;
import com.plm.plm.dto.CategoryDTO;
import com.plm.plm.Enums.TipoProducto;
import com.plm.plm.services.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @PostMapping
    public ResponseEntity<ApiResponseDTO<Map<String, CategoryDTO>>> createCategory(
            @RequestBody CategoryDTO categoryDTO) {
        CategoryDTO category = categoryService.createCategory(categoryDTO);
        Map<String, CategoryDTO> data = new HashMap<>();
        data.put("category", category);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponseDTO.success(data));
    }

    @GetMapping
    public ResponseEntity<ApiResponseDTO<Map<String, List<CategoryDTO>>>> getAllCategories(
            @RequestParam(required = false) String tipoProducto) {
        List<CategoryDTO> categories;
        
        if (tipoProducto != null && !tipoProducto.isEmpty()) {
            TipoProducto tipo = TipoProducto.fromString(tipoProducto);
            categories = categoryService.getCategoriesByTipoProducto(tipo);
        } else {
            categories = categoryService.getAllCategories();
        }
        
        Map<String, List<CategoryDTO>> data = new HashMap<>();
        data.put("categories", categories);
        return ResponseEntity.ok(ApiResponseDTO.success(data));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponseDTO<Map<String, CategoryDTO>>> getCategoryById(
            @PathVariable Integer id) {
        CategoryDTO category = categoryService.getCategoryById(id);
        Map<String, CategoryDTO> data = new HashMap<>();
        data.put("category", category);
        return ResponseEntity.ok(ApiResponseDTO.success(data));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponseDTO<Map<String, CategoryDTO>>> updateCategory(
            @PathVariable Integer id,
            @RequestBody CategoryDTO categoryDTO) {
        CategoryDTO category = categoryService.updateCategory(id, categoryDTO);
        Map<String, CategoryDTO> data = new HashMap<>();
        data.put("category", category);
        return ResponseEntity.ok(ApiResponseDTO.success(data));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponseDTO<Map<String, String>>> deleteCategory(@PathVariable Integer id) {
        categoryService.deleteCategory(id);
        Map<String, String> data = new HashMap<>();
        data.put("message", "Categoría eliminada correctamente");
        return ResponseEntity.ok(ApiResponseDTO.success(data));
    }
}

