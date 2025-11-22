package com.plm.plm.Controllers;

import com.plm.plm.dto.ApiResponseDTO;
import com.plm.plm.dto.ProductDTO;
import com.plm.plm.Enums.TipoProducto;
import com.plm.plm.services.MaterialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/materials")
public class MaterialController {

    @Autowired
    private MaterialService materialService;

    @GetMapping
    public ResponseEntity<ApiResponseDTO<Map<String, List<ProductDTO>>>> getAllMaterials(
            @RequestParam(required = false) String tipo,
            @RequestParam(required = false) String categoria,
            @RequestParam(required = false) String search) {
        List<ProductDTO> materials;

        if (search != null && !search.trim().isEmpty()) {
            materials = materialService.searchMaterials(search.trim());
        } else if (tipo != null && !tipo.isEmpty()) {
            TipoProducto tipoEnum = TipoProducto.fromString(tipo);
            materials = materialService.getMaterialsByTipo(tipoEnum);
        } else if (categoria != null && !categoria.isEmpty()) {
            materials = materialService.getMaterialsByCategoria(categoria);
        } else {
            materials = materialService.getAllMaterials();
        }

        Map<String, List<ProductDTO>> data = new HashMap<>();
        data.put("materials", materials);
        return ResponseEntity.ok(ApiResponseDTO.success(data));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponseDTO<Map<String, ProductDTO>>> getMaterialById(
            @PathVariable Integer id) {
        ProductDTO material = materialService.getMaterialById(id);
        Map<String, ProductDTO> data = new HashMap<>();
        data.put("material", material);
        return ResponseEntity.ok(ApiResponseDTO.success(data));
    }
}

