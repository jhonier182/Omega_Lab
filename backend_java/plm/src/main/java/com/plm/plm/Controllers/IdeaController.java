package com.plm.plm.Controllers;

import com.plm.plm.Config.exception.UnauthorizedException;
import com.plm.plm.Enums.EstadoIdea;
import com.plm.plm.dto.IdeaDTO;
import com.plm.plm.security.JwtTokenProvider;
import com.plm.plm.services.IdeaService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/ideas")
public class IdeaController {

    @Autowired
    private IdeaService ideaService;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @PostMapping
    public ResponseEntity<Map<String, Object>> createIdea(
            @RequestBody IdeaDTO ideaDTO,
            HttpServletRequest request) {
        Integer userId = getUserIdFromRequest(request);
        IdeaDTO idea = ideaService.createIdea(ideaDTO, userId);
        Map<String, Object> response = new HashMap<>();
        Map<String, IdeaDTO> data = new HashMap<>();
        data.put("idea", idea);
        response.put("data", data);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/generate-from-product")
    public ResponseEntity<Map<String, Object>> generateIdeasFromProduct(
            @RequestParam Integer productoId,
            @RequestParam String objetivo,
            HttpServletRequest request) {
        Integer userId = getUserIdFromRequest(request);
        
        // TODO: Aquí se implementaría la lógica de IA real
        // Por ahora, creamos una idea básica
        IdeaDTO ideaDTO = new IdeaDTO();
        ideaDTO.setProductoOrigenId(productoId);
        ideaDTO.setObjetivo(objetivo);
        ideaDTO.setTitulo("Nueva fórmula generada por IA");
        ideaDTO.setDescripcion("Fórmula generada automáticamente por IA basada en el producto seleccionado y el objetivo especificado.");
        ideaDTO.setCategoria("Nutracéutico");
        ideaDTO.setPrioridad("Media");
        
        IdeaDTO idea = ideaService.createIdea(ideaDTO, userId);
        Map<String, Object> response = new HashMap<>();
        Map<String, IdeaDTO> data = new HashMap<>();
        data.put("idea", idea);
        response.put("data", data);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> getAllIdeas(
            @RequestParam(required = false) String estado,
            @RequestParam(required = false) String categoria,
            @RequestParam(required = false) String prioridad,
            @RequestParam(required = false) String search) {
        EstadoIdea estadoEnum = null;
        if (estado != null && !estado.isEmpty()) {
            try {
                estadoEnum = EstadoIdea.fromString(estado);
            } catch (IllegalArgumentException e) {
                // Si el estado no es válido, se ignora
            }
        }
        List<IdeaDTO> ideas = ideaService.getAllIdeas(estadoEnum, categoria, prioridad, search);
        Map<String, Object> response = new HashMap<>();
        Map<String, List<IdeaDTO>> data = new HashMap<>();
        data.put("ideas", ideas);
        response.put("data", data);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getIdeaById(@PathVariable Integer id) {
        IdeaDTO idea = ideaService.getIdeaById(id);
        Map<String, Object> response = new HashMap<>();
        Map<String, IdeaDTO> data = new HashMap<>();
        data.put("idea", idea);
        response.put("data", data);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Map<String, Object>> updateIdea(
            @PathVariable Integer id,
            @RequestBody IdeaDTO ideaDTO) {
        IdeaDTO idea = ideaService.updateIdea(id, ideaDTO);
        Map<String, Object> response = new HashMap<>();
        Map<String, IdeaDTO> data = new HashMap<>();
        data.put("idea", idea);
        response.put("data", data);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> deleteIdea(@PathVariable Integer id) {
        ideaService.deleteIdea(id);
        Map<String, Object> response = new HashMap<>();
        Map<String, String> data = new HashMap<>();
        data.put("message", "Idea eliminada correctamente");
        response.put("data", data);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/{id}/approve")
    public ResponseEntity<Map<String, Object>> approveIdea(
            @PathVariable Integer id,
            HttpServletRequest request) {
        Integer userId = getUserIdFromRequest(request);
        IdeaDTO idea = ideaService.approveIdea(id, userId);
        Map<String, Object> response = new HashMap<>();
        Map<String, IdeaDTO> data = new HashMap<>();
        data.put("idea", idea);
        response.put("data", data);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/{id}/reject")
    public ResponseEntity<Map<String, Object>> rejectIdea(
            @PathVariable Integer id,
            HttpServletRequest request) {
        Integer userId = getUserIdFromRequest(request);
        IdeaDTO idea = ideaService.rejectIdea(id, userId);
        Map<String, Object> response = new HashMap<>();
        Map<String, IdeaDTO> data = new HashMap<>();
        data.put("idea", idea);
        response.put("data", data);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/{id}/change-estado")
    public ResponseEntity<Map<String, Object>> changeEstado(
            @PathVariable Integer id,
            @RequestParam String nuevoEstado,
            HttpServletRequest request) {
        Integer userId = getUserIdFromRequest(request);
        EstadoIdea estadoEnum = EstadoIdea.fromString(nuevoEstado);
        IdeaDTO idea = ideaService.changeEstado(id, estadoEnum, userId);
        Map<String, Object> response = new HashMap<>();
        Map<String, IdeaDTO> data = new HashMap<>();
        data.put("idea", idea);
        response.put("data", data);
        return ResponseEntity.ok(response);
    }

    private Integer getUserIdFromRequest(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            return jwtTokenProvider.getUserIdFromToken(token);
        }
        throw new UnauthorizedException("Token de autenticación no encontrado");
    }
}

