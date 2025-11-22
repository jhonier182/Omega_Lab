package com.plm.plm.services;

import com.plm.plm.DTO.*;


import java.util.List;
import java.util.Map;

public interface ProductService {
    ProductResponse createProduct(ProductRequest request);
    List<ProductResponse> getAllProducts(String tipo, String categoria, String search);
    Map<String, Object> getProductById(Integer id);
    ProductResponse updateProduct(Integer id, ProductRequest request);
    BOMResponse createOrUpdateBOM(Integer productoId, BOMRequest request, Integer userId);
    BOMItemResponse addMaterialToBOM(Integer bomId, BOMItemRequest request);
    BOMResponse getBOMWithItems(Integer bomId);
    BOMItemResponse updateBOMItem(Integer itemId, BOMItemRequest request);
    void deleteBOMItem(Integer itemId);
    BOMHistoryResponse getBOMHistory(Integer productoId);
}

