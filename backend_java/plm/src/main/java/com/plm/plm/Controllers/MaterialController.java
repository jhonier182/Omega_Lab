package com.plm.plm.Controllers;

import com.plm.plm.dto.MaterialDTO;
import com.plm.plm.services.MaterialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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

    @PostMapping
    public ResponseEntity<Map<String, MaterialDTO>> createMaterial(
            @RequestBody MaterialDTO materialDTO) {
        MaterialDTO material = materialService.createMaterial(materialDTO);
        Map<String, MaterialDTO> data = new HashMap<>();
        data.put("material", material);
        return ResponseEntity.status(HttpStatus.CREATED).body(data);
    }

    @GetMapping
    public ResponseEntity<Map<String, List<MaterialDTO>>> getAllMaterials(
            @RequestParam(required = false) String categoria,
            @RequestParam(required = false) String search) {
        List<MaterialDTO> materials;

        if (search != null && !search.trim().isEmpty()) {
            materials = materialService.searchMaterials(search.trim());
        } else if (categoria != null && !categoria.isEmpty()) {
            materials = materialService.getMaterialsByCategoria(categoria);
        } else {
            materials = materialService.getAllMaterials();
        }

        Map<String, List<MaterialDTO>> data = new HashMap<>();
        data.put("materials", materials);
        return ResponseEntity.ok(data);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, MaterialDTO>> getMaterialById(
            @PathVariable Integer id) {
        MaterialDTO material = materialService.getMaterialById(id);
        Map<String, MaterialDTO> data = new HashMap<>();
        data.put("material", material);
        return ResponseEntity.ok(data);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Map<String, MaterialDTO>> updateMaterial(
            @PathVariable Integer id,
            @RequestBody MaterialDTO materialDTO) {
        MaterialDTO material = materialService.updateMaterial(id, materialDTO);
        Map<String, MaterialDTO> data = new HashMap<>();
        data.put("material", material);
        return ResponseEntity.ok(data);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteMaterial(@PathVariable Integer id) {
        materialService.deleteMaterial(id);
        Map<String, String> data = new HashMap<>();
        data.put("message", "Material eliminado correctamente");
        return ResponseEntity.ok(data);
    }
}
