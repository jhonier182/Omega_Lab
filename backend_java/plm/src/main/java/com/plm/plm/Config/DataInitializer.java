package com.plm.plm.Config;

import com.plm.plm.Enums.EstadoBOM;
import com.plm.plm.Enums.EstadoUsuario;
import com.plm.plm.Enums.Rol;
import com.plm.plm.Enums.TipoProducto;
import com.plm.plm.Models.BOM;
import com.plm.plm.Models.BOMItem;
import com.plm.plm.Models.Category;
import com.plm.plm.Models.Material;
import com.plm.plm.Models.Product;
import com.plm.plm.Models.User;
import com.plm.plm.Reposotory.BOMItemRepository;
import com.plm.plm.Reposotory.BOMRepository;
import com.plm.plm.Reposotory.CategoryRepository;
import com.plm.plm.Reposotory.MaterialRepository;
import com.plm.plm.Reposotory.ProductRepository;
import com.plm.plm.Reposotory.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private BOMRepository bomRepository;

    @Autowired
    private BOMItemRepository bomItemRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private MaterialRepository materialRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        initializeAdmin();
        initializeCategories();
        initializeMaterials();
        initializeProducts();
        initializeBOMs();
    }

    private void initializeAdmin() {
        String email = "admin@proscience.com";
        String password = "admin123";
        String nombre = "Administrador";
        Rol rol = Rol.ADMIN;

        if (userRepository.existsByEmail(email)) {
            System.out.println("El usuario administrador ya existe");
            return;
        }

        String hashedPassword = passwordEncoder.encode(password);

        User admin = new User();
        admin.setEmail(email);
        admin.setPassword(hashedPassword);
        admin.setNombre(nombre);
        admin.setRol(rol);
        admin.setEstado(EstadoUsuario.ACTIVO);

        userRepository.save(admin);

        System.out.println("Usuario administrador creado exitosamente");
        System.out.println("Email: " + email);
        System.out.println("Password: " + password);
        System.out.println("IMPORTANTE: Cambia la contraseña después del primer login");
    }

    private void initializeCategories() {
        long existingProducts = productRepository.count();
        if (existingProducts > 0) {
            System.out.println("Eliminando " + existingProducts + " productos existentes...");
            productRepository.deleteAll();
            System.out.println("Productos eliminados exitosamente");
        }

        long existingCategories = categoryRepository.count();
        if (existingCategories > 0) {
            System.out.println("Eliminando " + existingCategories + " categorías existentes...");
            categoryRepository.deleteAll();
            System.out.println("Categorías eliminadas exitosamente");
        }

        List<Category> categories = new ArrayList<>();

        String[][] categoriasPT = {
            {"Proteínas", "Proteínas de suero y mezclas proteicas"},
            {"Proteínas Veganas", "Proteínas de origen vegetal"},
            {"Proteínas Premium", "Proteínas de alta calidad y pureza"},
            {"Creatinas", "Suplementos de creatina estándar"},
            {"Creatinas Premium", "Creatinas de máxima pureza"},
            {"Aminoácidos", "Suplementos de aminoácidos esenciales y BCAA"},
            {"Pre-entrenamiento", "Suplementos pre-entrenamiento con estimulantes"},
            {"Multivitamínicos", "Complejos multivitamínicos"},
            {"Omega 3", "Ácidos grasos Omega 3"},
            {"Kits", "Kits y combos de productos"}
        };

        String[][] categoriasMP = {
            {"Proteínas MP", "Materias primas proteicas"},
            {"Proteínas Vegetales MP", "Proteínas de origen vegetal"},
            {"Creatinas MP", "Materias primas de creatina"},
            {"Aminoácidos MP", "Aminoácidos en polvo"},
            {"Estimulantes", "Estimulantes y energizantes"},
            {"Vasodilatadores", "Vasodilatadores para bombeo"},
            {"Carbohidratos", "Carbohidratos de rápida absorción"}
        };

        String[][] categoriasComp = {
            {"Edulcorantes", "Edulcorantes artificiales y naturales"},
            {"Saborizantes", "Saborizantes artificiales"},
            {"Colorantes", "Colorantes naturales y artificiales"},
            {"Emulsionantes", "Emulsionantes y estabilizantes"},
            {"Espesantes", "Espesantes y texturizantes"},
            {"Acidulantes", "Acidulantes para regulación de pH"},
            {"Vitaminas", "Vitaminas en polvo"},
            {"Enzimas", "Enzimas digestivas"}
        };

        for (String[] cat : categoriasPT) {
            Category category = new Category();
            category.setNombre(cat[0]);
            category.setDescripcion(cat[1]);
            category.setTipoProducto(TipoProducto.PRODUCTO_TERMINADO);
            category.setEstado(EstadoUsuario.ACTIVO);
            categories.add(category);
        }

        for (String[] cat : categoriasMP) {
            Category category = new Category();
            category.setNombre(cat[0]);
            category.setDescripcion(cat[1]);
            category.setTipoProducto(TipoProducto.MATERIA_PRIMA);
            category.setEstado(EstadoUsuario.ACTIVO);
            categories.add(category);
        }

        for (String[] cat : categoriasComp) {
            Category category = new Category();
            category.setNombre(cat[0]);
            category.setDescripcion(cat[1]);
            category.setTipoProducto(TipoProducto.COMPONENTE);
            category.setEstado(EstadoUsuario.ACTIVO);
            categories.add(category);
        }

        categoryRepository.saveAll(categories);
        System.out.println("Se crearon " + categories.size() + " categorías exitosamente");
    }

    private void initializeProducts() {

        List<Product> products = new ArrayList<>();

        String[] productosTerminados = {
            "BEST WHEY 2.04 LB", "BEST WHEY 4 LB", "BEST PROTEIN 2.04 LB",
            "BEST VEGAN", "SMART 3.25 LB", "SMART 6 LB", "SMART BOLSA 13.01 LB",
            "LA WEY 1.72 LB", "LEGACY 30S CREATINA HCL", "LEGACY 50S CREATINA HCL",
            "LEGACY PLUS 50S", "LEGEND CON CREAPURE®", "LEGEND CON CREAPURE® 50s",
            "EEA'S (ARMY) 30 SERVICIOS", "INTENZE 30 SERVICIOS", "THE ONE",
            "OMEGA 3", "KIT GYMBRO", "KIT GYM RAT", "KIT ESSENTIAL"
        };

        String[] descripcionesPT = {
            "Proteína de suero de leche concentrada, 2.04 libras. Alta calidad y pureza.",
            "Proteína de suero de leche concentrada, 4 libras. Formato económico.",
            "Mezcla premium de proteínas de múltiples fuentes, 2.04 libras.",
            "Proteína vegana a base de plantas. Sin ingredientes de origen animal.",
            "Proteína inteligente con fórmula avanzada, 3.25 libras.",
            "Proteína inteligente con fórmula avanzada, 6 libras. Formato familiar.",
            "Proteína inteligente en presentación económica, 13.01 libras.",
            "Proteína de suero de leche premium, 1.72 libras.",
            "Creatina HCL en cápsulas, 30 servicios. Alta absorción.",
            "Creatina HCL en cápsulas, 50 servicios. Formato económico.",
            "Creatina HCL plus con ingredientes adicionales, 50 servicios.",
            "Creatina monohidrato con Creapure®, máxima pureza y calidad.",
            "Creatina monohidrato con Creapure®, 50 servicios. Formato extendido.",
            "Aminoácidos esenciales (EEA's) en presentación Army, 30 servicios.",
            "Pre-entrenamiento intenso, 30 servicios. Energía y rendimiento.",
            "Suplemento multivitamínico completo. Todo en uno.",
            "Ácidos grasos Omega 3. Apoyo cardiovascular y cognitivo.",
            "Kit básico para principiantes en el gimnasio.",
            "Kit intermedio para atletas regulares.",
            "Kit esencial con productos fundamentales."
        };

        String[] categoriasPT = {
            "Proteínas", "Proteínas", "Proteínas", "Proteínas Veganas",
            "Proteínas", "Proteínas", "Proteínas", "Proteínas Premium",
            "Creatinas", "Creatinas", "Creatinas", "Creatinas Premium",
            "Creatinas Premium", "Aminoácidos", "Pre-entrenamiento",
            "Multivitamínicos", "Omega 3", "Kits", "Kits", "Kits"
        };

        java.util.Map<String, Category> categoriasMap = new java.util.HashMap<>();
        List<Category> allCategories = categoryRepository.findAll();
        for (Category cat : allCategories) {
            categoriasMap.put(cat.getNombre(), cat);
        }

        for (int i = 0; i < 20; i++) {
            Product product = new Product();
            product.setCodigo("PT-" + String.format("%03d", i + 1));
            product.setNombre(productosTerminados[i]);
            product.setDescripcion(descripcionesPT[i]);
            product.setCategoria(categoriasPT[i]);
            Category categoriaEntity = categoriasMap.get(categoriasPT[i]);
            if (categoriaEntity != null) {
                product.setCategoriaEntity(categoriaEntity);
            }
            product.setUnidadMedida("un");
            product.setEstado(EstadoUsuario.ACTIVO);
            products.add(product);
        }

        productRepository.saveAll(products);
        System.out.println("Se crearon " + products.size() + " productos terminados exitosamente");
    }

    private void initializeMaterials() {
        List<Material> materials = new ArrayList<>();

        String[] materiasPrimas = {
            "Proteína de Suero Concentrada (WPC 80%)", "Proteína de Suero Aislada (WPI 90%)",
            "Caseína Micelar", "Proteína de Guisante", "Proteína de Arroz",
            "Creatina Monohidrato", "Creatina HCL", "BCAA (2:1:1)",
            "Aminoácidos Esenciales (EEA)", "L-Glutamina", "Beta Alanina",
            "Cafeína Anhidra", "Citrulina Malato", "Taurina", "Dextrosa"
        };

        String[] descripcionesMP = {
            "Proteína de suero concentrada al 80%. Materia prima base para proteínas.",
            "Proteína de suero aislada al 90%. Alta pureza y biodisponibilidad.",
            "Caseína micelar de lenta absorción. Ideal para productos nocturnos.",
            "Proteína vegetal de guisante. Base para productos veganos.",
            "Proteína vegetal de arroz. Complemento para mezclas veganas.",
            "Creatina monohidrato pura. Estándar de la industria.",
            "Creatina hidrocloruro. Mayor solubilidad y absorción.",
            "Aminoácidos de cadena ramificada en proporción 2:1:1.",
            "Mezcla de aminoácidos esenciales. Recuperación muscular.",
            "L-Glutamina en polvo. Recuperación y sistema inmune.",
            "Beta Alanina en polvo. Resistencia y rendimiento.",
            "Cafeína anhidra pura. Estimulante para pre-entrenamiento.",
            "Citrulina malato. Vasodilatación y bombeo muscular.",
            "Taurina en polvo. Apoyo energético y cardiovascular.",
            "Dextrosa pura. Carbohidrato de rápida absorción."
        };

        String[] categoriasMP = {
            "Proteínas MP", "Proteínas MP", "Proteínas MP", "Proteínas Vegetales MP",
            "Proteínas Vegetales MP", "Creatinas MP", "Creatinas MP", "Aminoácidos MP",
            "Aminoácidos MP", "Aminoácidos MP", "Aminoácidos MP", "Estimulantes",
            "Vasodilatadores", "Aminoácidos MP", "Carbohidratos"
        };

        java.util.Map<String, Category> categoriasMap = new java.util.HashMap<>();
        List<Category> allCategories = categoryRepository.findAll();
        for (Category cat : allCategories) {
            categoriasMap.put(cat.getNombre(), cat);
        }

        for (int i = 0; i < 15; i++) {
            Material material = new Material();
            material.setCodigo("MP-" + String.format("%03d", i + 1));
            material.setNombre(materiasPrimas[i]);
            material.setDescripcion(descripcionesMP[i]);
            material.setCategoria(categoriasMP[i]);
            Category categoriaEntity = categoriasMap.get(categoriasMP[i]);
            if (categoriaEntity != null) {
                material.setCategoriaEntity(categoriaEntity);
            }
            material.setUnidadMedida("kg");
            material.setEstado(EstadoUsuario.ACTIVO);
            materials.add(material);
        }

        materialRepository.saveAll(materials);
        System.out.println("Se crearon " + materials.size() + " materiales exitosamente");
    }

    private void initializeBOMs() {
        // Eliminar todos los BOMs existentes
        long existingBOMs = bomRepository.count();
        if (existingBOMs > 0) {
            System.out.println("Eliminando " + existingBOMs + " BOMs existentes...");
            bomRepository.deleteAll();
            System.out.println("BOMs eliminados exitosamente");
        }

        // Obtener el usuario admin para asignar como creador
        Optional<User> adminOpt = userRepository.findByEmail("admin@proscience.com");
        User admin = adminOpt.orElse(null);

        List<Product> allProducts = productRepository.findAll();
        java.util.Map<String, Product> productosMap = new java.util.HashMap<>();
        for (Product p : allProducts) {
            productosMap.put(p.getCodigo(), p);
        }

        List<Material> allMaterials = materialRepository.findAll();
        java.util.Map<String, Material> materialesMap = new java.util.HashMap<>();
        for (Material m : allMaterials) {
            materialesMap.put(m.getCodigo(), m);
        }

        // Crear BOMs para productos terminados de proteínas
        createBOMForProduct(productosMap.get("PT-001"), "BEST WHEY 2.04 LB", admin, productosMap,
            new String[]{"MP-001", "MP-001", "MP-001", "MP-001", "MP-001"},
            new double[]{0.85, 0.05, 0.03, 0.04, 0.03},
            new String[]{"kg", "kg", "kg", "kg", "kg"});

        createBOMForProduct(productosMap.get("PT-002"), "BEST WHEY 4 LB", admin, productosMap,
            new String[]{"MP-001", "MP-002", "MP-003", "MP-004", "MP-005"},
            new double[]{0.85, 0.05, 0.03, 0.04, 0.03},
            new String[]{"kg", "kg", "kg", "kg", "kg"});

        createBOMForProduct(productosMap.get("PT-003"), "BEST PROTEIN 2.04 LB", admin, productosMap,
            new String[]{"MP-001", "MP-002", "MP-003", "MP-004", "MP-005", "MP-006"},
            new double[]{0.50, 0.30, 0.15, 0.03, 0.01, 0.01},
            new String[]{"kg", "kg", "kg", "kg", "kg", "kg"});

        createBOMForProduct(productosMap.get("PT-004"), "BEST VEGAN", admin, productosMap,
            new String[]{"MP-004", "MP-005", "MP-006", "MP-007", "MP-008", "MP-009"},
            new double[]{0.60, 0.30, 0.02, 0.04, 0.02, 0.02},
            new String[]{"kg", "kg", "kg", "kg", "kg", "kg"});

        createBOMForProduct(productosMap.get("PT-005"), "SMART 3.25 LB", admin, productosMap,
            new String[]{"MP-001", "MP-002", "MP-003", "MP-004", "MP-005", "MP-006"},
            new double[]{0.70, 0.20, 0.05, 0.02, 0.02, 0.01},
            new String[]{"kg", "kg", "kg", "kg", "kg", "kg"});

        createBOMForProduct(productosMap.get("PT-006"), "SMART 6 LB", admin, productosMap,
            new String[]{"MP-001", "MP-002", "MP-003", "MP-004", "MP-005", "MP-006"},
            new double[]{0.70, 0.20, 0.05, 0.02, 0.02, 0.01},
            new String[]{"kg", "kg", "kg", "kg", "kg", "kg"});

        createBOMForProduct(productosMap.get("PT-007"), "SMART BOLSA 13.01 LB", admin, productosMap,
            new String[]{"MP-001", "MP-002", "MP-003", "MP-004", "MP-005", "MP-006"},
            new double[]{0.70, 0.20, 0.05, 0.02, 0.02, 0.01},
            new String[]{"kg", "kg", "kg", "kg", "kg", "kg"});

        createBOMForProduct(productosMap.get("PT-008"), "LA WEY 1.72 LB", admin, productosMap,
            new String[]{"MP-002", "MP-003", "MP-004", "MP-005", "MP-006"},
            new double[]{0.90, 0.05, 0.02, 0.02, 0.01},
            new String[]{"kg", "kg", "kg", "kg", "kg"});

        // BOMs para creatinas
        createBOMForProduct(productosMap.get("PT-009"), "LEGACY 30S CREATINA HCL", admin, productosMap,
            new String[]{"MP-006", "MP-007"},
            new double[]{0.95, 0.05},
            new String[]{"kg", "kg"});

        createBOMForProduct(productosMap.get("PT-010"), "LEGACY 50S CREATINA HCL", admin, productosMap,
            new String[]{"MP-006", "MP-007"},
            new double[]{0.95, 0.05},
            new String[]{"kg", "kg"});

        createBOMForProduct(productosMap.get("PT-011"), "LEGACY PLUS 50S", admin, productosMap,
            new String[]{"MP-006", "MP-007", "MP-010"},
            new double[]{0.85, 0.10, 0.05},
            new String[]{"kg", "kg", "kg"});

        createBOMForProduct(productosMap.get("PT-012"), "LEGEND CON CREAPURE®", admin, productosMap,
            new String[]{"MP-006"},
            new double[]{1.0},
            new String[]{"kg"});

        createBOMForProduct(productosMap.get("PT-013"), "LEGEND CON CREAPURE® 50s", admin, productosMap,
            new String[]{"MP-006"},
            new double[]{1.0},
            new String[]{"kg"});

        // BOMs para suplementos
        createBOMForProduct(productosMap.get("PT-014"), "EEA'S (ARMY) 30 SERVICIOS", admin, productosMap,
            new String[]{"MP-008", "MP-009", "MP-010", "MP-011", "MP-012"},
            new double[]{0.40, 0.35, 0.20, 0.03, 0.02},
            new String[]{"kg", "kg", "kg", "kg", "kg"});

        createBOMForProduct(productosMap.get("PT-015"), "INTENZE 30 SERVICIOS", admin, productosMap,
            new String[]{"MP-011", "MP-012", "MP-013", "MP-014", "MP-001", "MP-002"},
            new double[]{0.30, 0.25, 0.20, 0.15, 0.05, 0.05},
            new String[]{"kg", "kg", "kg", "kg", "kg", "kg"});

        createBOMForProduct(productosMap.get("PT-016"), "THE ONE", admin, productosMap,
            new String[]{"MP-010", "MP-011", "MP-012", "MP-013", "MP-014"},
            new double[]{0.20, 0.15, 0.30, 0.20, 0.15},
            new String[]{"kg", "kg", "kg", "kg", "kg"});

        createBOMForProduct(productosMap.get("PT-017"), "OMEGA 3", admin, productosMap,
            new String[]{"MP-001", "MP-002"},
            new double[]{0.90, 0.10},
            new String[]{"kg", "kg"});

        // Los kits no tienen BOM directo, son combinaciones de productos terminados
        // Pero podemos crear BOMs básicos para ellos
        createBOMForProduct(productosMap.get("PT-018"), "KIT GYMBRO", admin, productosMap,
            new String[]{"MP-001", "MP-006", "MP-007", "MP-008"},
            new double[]{0.60, 0.30, 0.05, 0.05},
            new String[]{"kg", "kg", "kg", "kg"});

        createBOMForProduct(productosMap.get("PT-019"), "KIT GYM RAT", admin, productosMap,
            new String[]{"MP-001", "MP-006", "MP-008", "MP-009", "MP-010"},
            new double[]{0.50, 0.25, 0.15, 0.05, 0.05},
            new String[]{"kg", "kg", "kg", "kg", "kg"});

        createBOMForProduct(productosMap.get("PT-020"), "KIT ESSENTIAL", admin, productosMap,
            new String[]{"MP-001", "MP-006", "MP-008", "MP-010", "MP-011"},
            new double[]{0.40, 0.20, 0.20, 0.15, 0.05},
            new String[]{"kg", "kg", "kg", "kg", "kg"});

        System.out.println("Se crearon BOMs para todos los productos terminados exitosamente");
    }

    private void createBOMForProduct(Product producto, String nombreBOM, User creador, 
                                     java.util.Map<String, Product> productosMap,
                                     String[] codigosMateriales, double[] porcentajes,
                                     String[] unidades) {
        if (producto == null) {
            System.out.println("Producto no encontrado para crear BOM");
            return;
        }

        List<Material> allMaterials = materialRepository.findAll();
        java.util.Map<String, Material> materialesMap = new java.util.HashMap<>();
        for (Material m : allMaterials) {
            materialesMap.put(m.getCodigo(), m);
        }

        BOM bom = new BOM();
        bom.setProducto(producto);
        bom.setVersion("1.0");
        bom.setEstado(EstadoBOM.APROBADO);
        bom.setJustificacion("BOM inicial creado automáticamente para " + nombreBOM);
        bom.setCreador(creador);
        bom.setAprobador(creador);
        bom.setApprovedAt(java.time.LocalDateTime.now());

        bom = bomRepository.save(bom);

        List<BOMItem> items = new ArrayList<>();
        double totalPorcentaje = 0.0;

        for (int i = 0; i < codigosMateriales.length; i++) {
            Material material = materialesMap.get(codigosMateriales[i]);
            if (material == null) {
                System.out.println("Material no encontrado: " + codigosMateriales[i]);
                continue;
            }

            BOMItem item = new BOMItem();
            item.setBom(bom);
            item.setMaterial(material);
            
            // Calcular cantidad basada en porcentaje
            // Para kg: cantidad en kg, para g: cantidad en gramos
            BigDecimal cantidad;
            if (unidades[i].equals("kg")) {
                cantidad = BigDecimal.valueOf(porcentajes[i]); // Porcentaje directo en kg
            } else {
                cantidad = BigDecimal.valueOf(porcentajes[i] * 1000.0); // Convertir a gramos
            }
            item.setCantidad(cantidad);
            item.setUnidad(unidades[i]);
            item.setPorcentaje(BigDecimal.valueOf(porcentajes[i] * 100.0));
            item.setSecuencia(i + 1);

            items.add(item);
            totalPorcentaje += porcentajes[i];
        }

        // Ajustar porcentajes si no suman exactamente 100%
        if (Math.abs(totalPorcentaje - 1.0) > 0.01) {
            double factor = 1.0 / totalPorcentaje;
            for (BOMItem item : items) {
                BigDecimal nuevoPorcentaje = item.getPorcentaje().multiply(BigDecimal.valueOf(factor));
                item.setPorcentaje(nuevoPorcentaje);
            }
        }

        bomItemRepository.saveAll(items);
    }
}

