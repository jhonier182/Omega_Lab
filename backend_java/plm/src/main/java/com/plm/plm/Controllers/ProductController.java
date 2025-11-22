package com.plm.plm.Controllers;

import com.plm.plm.dto.ApiResponseDTO;
import com.plm.plm.dto.BOMDTO;
import com.plm.plm.dto.BOMItemDTO;
import com.plm.plm.dto.ProductDTO;
import com.plm.plm.security.JwtTokenProvider;
import com.plm.plm.services.ProductService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @PostMapping
    public ResponseEntity<ApiResponseDTO<Map<String, ProductDTO>>> createProduct(
            @RequestBody ProductDTO productDTO) {
        ProductDTO product = productService.createProduct(productDTO);
        Map<String, ProductDTO> data = new HashMap<>();
        data.put("product", product);
        return ResponseEntity.status(HttpStatus.CREATED)
            .body(ApiResponseDTO.success(data));
    }

    @GetMapping
    public ResponseEntity<ApiResponseDTO<Map<String, List<ProductDTO>>>> getAllProducts(
            @RequestParam(required = false) String tipo,
            @RequestParam(required = false) String categoria,
            @RequestParam(required = false) String search) {
        List<ProductDTO> products = productService.getAllProducts(tipo, categoria, search);
        Map<String, List<ProductDTO>> data = new HashMap<>();
        data.put("products", products);
        return ResponseEntity.ok(ApiResponseDTO.success(data));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponseDTO<Map<String, Object>>> getProductById(@PathVariable Integer id) {
        Map<String, Object> data = productService.getProductById(id);
        return ResponseEntity.ok(ApiResponseDTO.success(data));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponseDTO<Map<String, ProductDTO>>> updateProduct(
            @PathVariable Integer id,
            @RequestBody ProductDTO productDTO) {
        ProductDTO product = productService.updateProduct(id, productDTO);
        Map<String, ProductDTO> data = new HashMap<>();
        data.put("product", product);
        return ResponseEntity.ok(ApiResponseDTO.success(data));
    }

    @PostMapping("/{id}/bom")
    public ResponseEntity<ApiResponseDTO<Map<String, BOMDTO>>> createOrUpdateBOM(
            @PathVariable Integer id,
            @RequestBody BOMDTO bomDTO,
            HttpServletRequest httpRequest) {
        Integer userId = getUserIdFromRequest(httpRequest);
        BOMDTO bom = productService.createOrUpdateBOM(id, bomDTO, userId);
        Map<String, BOMDTO> data = new HashMap<>();
        data.put("bom", bom);
        return ResponseEntity.ok(ApiResponseDTO.success(data));
    }

    @GetMapping("/{id}/bom/history")
    public ResponseEntity<ApiResponseDTO<Map<String, List<BOMDTO>>>> getBOMHistory(
            @PathVariable Integer id) {
        List<BOMDTO> history = productService.getBOMHistory(id);
        Map<String, List<BOMDTO>> data = new HashMap<>();
        data.put("history", history);
        return ResponseEntity.ok(ApiResponseDTO.success(data));
    }

    @PostMapping("/boms/{bomId}/items")
    public ResponseEntity<ApiResponseDTO<Map<String, BOMItemDTO>>> addMaterialToBOM(
            @PathVariable Integer bomId,
            @RequestBody BOMItemDTO bomItemDTO) {
        BOMItemDTO item = productService.addMaterialToBOM(bomId, bomItemDTO);
        Map<String, BOMItemDTO> data = new HashMap<>();
        data.put("item", item);
        return ResponseEntity.status(HttpStatus.CREATED)
            .body(ApiResponseDTO.success(data));
    }

    @GetMapping("/boms/{bomId}")
    public ResponseEntity<ApiResponseDTO<Map<String, BOMDTO>>> getBOMWithItems(
            @PathVariable Integer bomId) {
        BOMDTO bom = productService.getBOMWithItems(bomId);
        Map<String, BOMDTO> data = new HashMap<>();
        data.put("bom", bom);
        return ResponseEntity.ok(ApiResponseDTO.success(data));
    }

    @PutMapping("/bom-items/{itemId}")
    public ResponseEntity<ApiResponseDTO<Map<String, BOMItemDTO>>> updateBOMItem(
            @PathVariable Integer itemId,
            @RequestBody BOMItemDTO bomItemDTO) {
        BOMItemDTO item = productService.updateBOMItem(itemId, bomItemDTO);
        Map<String, BOMItemDTO> data = new HashMap<>();
        data.put("item", item);
        return ResponseEntity.ok(ApiResponseDTO.success(data));
    }

    @DeleteMapping("/bom-items/{itemId}")
    public ResponseEntity<ApiResponseDTO<Map<String, String>>> deleteBOMItem(@PathVariable Integer itemId) {
        productService.deleteBOMItem(itemId);
        Map<String, String> data = new HashMap<>();
        data.put("message", "Item eliminado correctamente");
        return ResponseEntity.ok(ApiResponseDTO.success(data));
    }

    private Integer getUserIdFromRequest(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            return jwtTokenProvider.getUserIdFromToken(token);
        }
        throw new RuntimeException("Token no encontrado");
    }
}

