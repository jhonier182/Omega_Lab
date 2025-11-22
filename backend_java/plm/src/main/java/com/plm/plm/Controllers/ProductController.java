package com.plm.plm.Controllers;

import com.plm.plm.Config.JwtTokenProvider;
import com.plm.plm.DTO.*;
import com.plm.plm.services.ProductService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @PostMapping
    public ResponseEntity<ApiResponse<Map<String, ProductResponse>>> createProduct(
            @Valid @RequestBody ProductRequest request) {
        ProductResponse product = productService.createProduct(request);
        Map<String, ProductResponse> data = new HashMap<>();
        data.put("product", product);
        return ResponseEntity.status(HttpStatus.CREATED)
            .body(ApiResponse.success(data));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<Map<String, java.util.List<ProductResponse>>>> getAllProducts(
            @RequestParam(required = false) String tipo,
            @RequestParam(required = false) String categoria,
            @RequestParam(required = false) String search) {
        java.util.List<ProductResponse> products = productService.getAllProducts(tipo, categoria, search);
        Map<String, java.util.List<ProductResponse>> data = new HashMap<>();
        data.put("products", products);
        return ResponseEntity.ok(ApiResponse.success(data));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getProductById(@PathVariable Integer id) {
        Map<String, Object> data = productService.getProductById(id);
        return ResponseEntity.ok(ApiResponse.success(data));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Map<String, ProductResponse>>> updateProduct(
            @PathVariable Integer id,
            @Valid @RequestBody ProductRequest request) {
        ProductResponse product = productService.updateProduct(id, request);
        Map<String, ProductResponse> data = new HashMap<>();
        data.put("product", product);
        return ResponseEntity.ok(ApiResponse.success(data));
    }

    @PostMapping("/{id}/bom")
    public ResponseEntity<ApiResponse<Map<String, BOMResponse>>> createOrUpdateBOM(
            @PathVariable Integer id,
            @Valid @RequestBody BOMRequest request,
            HttpServletRequest httpRequest) {
        Integer userId = getUserIdFromRequest(httpRequest);
        BOMResponse bom = productService.createOrUpdateBOM(id, request, userId);
        Map<String, BOMResponse> data = new HashMap<>();
        data.put("bom", bom);
        return ResponseEntity.ok(ApiResponse.success(data));
    }


    @GetMapping("/{id}/bom/history")
    public ResponseEntity<ApiResponse<Map<String, java.util.List<BOMResponse>>>> getBOMHistory(
            @PathVariable Integer id) {
        BOMHistoryResponse historyResponse = productService.getBOMHistory(id);
        Map<String, java.util.List<BOMResponse>> data = new HashMap<>();
        data.put("history", historyResponse.getHistory());
        return ResponseEntity.ok(ApiResponse.success(data));
    }

    @PostMapping("/boms/{bomId}/items")
    public ResponseEntity<ApiResponse<Map<String, BOMItemResponse>>> addMaterialToBOM(
            @PathVariable Integer bomId,
            @Valid @RequestBody BOMItemRequest request) {
        BOMItemResponse item = productService.addMaterialToBOM(bomId, request);
        Map<String, BOMItemResponse> data = new HashMap<>();
        data.put("item", item);
        return ResponseEntity.status(HttpStatus.CREATED)
            .body(ApiResponse.success(data));
    }

    @GetMapping("/boms/{bomId}")
    public ResponseEntity<ApiResponse<Map<String, BOMResponse>>> getBOMWithItems(
            @PathVariable Integer bomId) {
        BOMResponse bom = productService.getBOMWithItems(bomId);
        Map<String, BOMResponse> data = new HashMap<>();
        data.put("bom", bom);
        return ResponseEntity.ok(ApiResponse.success(data));
    }

    @PutMapping("/bom-items/{itemId}")
    public ResponseEntity<ApiResponse<Map<String, BOMItemResponse>>> updateBOMItem(
            @PathVariable Integer itemId,
            @Valid @RequestBody BOMItemRequest request) {
        BOMItemResponse item = productService.updateBOMItem(itemId, request);
        Map<String, BOMItemResponse> data = new HashMap<>();
        data.put("item", item);
        return ResponseEntity.ok(ApiResponse.success(data));
    }

    @DeleteMapping("/bom-items/{itemId}")
    public ResponseEntity<ApiResponse<Map<String, String>>> deleteBOMItem(@PathVariable Integer itemId) {
        productService.deleteBOMItem(itemId);
        Map<String, String> data = new HashMap<>();
        data.put("message", "Item eliminado correctamente");
        return ResponseEntity.ok(ApiResponse.success(data));
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

