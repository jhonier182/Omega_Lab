package com.plm.plm.services;

import com.plm.plm.dto.ProductDTO;
import com.plm.plm.Enums.TipoProducto;

import java.util.List;

public interface MaterialService {
    List<ProductDTO> getAllMaterials();
    List<ProductDTO> getMaterialsByTipo(TipoProducto tipo);
    List<ProductDTO> getMaterialsByCategoria(String categoria);
    ProductDTO getMaterialById(Integer id);
    List<ProductDTO> searchMaterials(String search);
}

