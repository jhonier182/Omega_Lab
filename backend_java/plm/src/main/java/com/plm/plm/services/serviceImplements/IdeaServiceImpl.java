package com.plm.plm.services.serviceImplements;

import com.plm.plm.Config.Exception.BadRequestException;
import com.plm.plm.Config.exception.ResourceNotFoundException;
import com.plm.plm.Enums.EstadoIdea;
import com.plm.plm.Models.Idea;
import com.plm.plm.Models.User;
import com.plm.plm.Models.Product;
import com.plm.plm.Reposotory.IdeaRepository;
import com.plm.plm.Reposotory.ProductRepository;
import com.plm.plm.Reposotory.UserRepository;
import com.plm.plm.dto.IdeaDTO;
import com.plm.plm.services.IdeaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class IdeaServiceImpl implements IdeaService {

    @Autowired
    private IdeaRepository ideaRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    @Override
    @Transactional
    public IdeaDTO createIdea(IdeaDTO ideaDTO, Integer userId) {
        validateIdeaData(ideaDTO);

        User creador = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado"));

        Idea idea = new Idea();
        idea.setTitulo(ideaDTO.getTitulo());
        idea.setDescripcion(ideaDTO.getDescripcion());
        idea.setDetallesIA(ideaDTO.getDetallesIA());
        idea.setCategoria(ideaDTO.getCategoria() != null ? ideaDTO.getCategoria() : "Nutracéutico");
        idea.setPrioridad(ideaDTO.getPrioridad() != null ? ideaDTO.getPrioridad() : "Media");
        idea.setObjetivo(ideaDTO.getObjetivo());
        idea.setEstado(EstadoIdea.GENERADA);
        idea.setCreador(creador);

        // Si hay producto origen, establecerlo
        if (ideaDTO.getProductoOrigenId() != null) {
            try {
                Product productoOrigen = productRepository.findById(ideaDTO.getProductoOrigenId())
                        .orElseThrow(() -> new ResourceNotFoundException("Producto origen no encontrado con ID: " + ideaDTO.getProductoOrigenId()));
                idea.setProductoOrigen(productoOrigen);
            } catch (Exception e) {
                throw new BadRequestException("Error al buscar el producto origen: " + e.getMessage());
            }
        }

        try {
            return ideaRepository.save(idea).getDTO();
        } catch (Exception e) {
            System.err.println("Error al guardar idea: " + e.getMessage());
            e.printStackTrace();
            throw new BadRequestException("Error al guardar la idea. Verifique que la base de datos esté actualizada. Detalle: " + e.getMessage());
        }
    }

    @Override
    @Transactional(readOnly = true)
    public List<IdeaDTO> getAllIdeas(EstadoIdea estado, String categoria, String prioridad, String search) {
        List<Idea> ideas = ideaRepository.findByFilters(estado, categoria, prioridad, search);
        return ideas.stream()
                .map(Idea::getDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public IdeaDTO getIdeaById(Integer id) {
        Idea idea = ideaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Idea no encontrada"));
        return idea.getDTO();
    }

    @Override
    @Transactional
    public IdeaDTO updateIdea(Integer id, IdeaDTO ideaDTO) {
        Idea idea = ideaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Idea no encontrada"));

        // Solo se puede editar si está en generada o en revisión
        if (idea.getEstado() != EstadoIdea.GENERADA && idea.getEstado() != EstadoIdea.EN_REVISION) {
            throw new BadRequestException("No se puede editar una idea que no está en estado Generada o En Revisión");
        }

        validateIdeaData(ideaDTO);

        idea.setTitulo(ideaDTO.getTitulo());
        idea.setDescripcion(ideaDTO.getDescripcion());
        if (ideaDTO.getCategoria() != null) {
            idea.setCategoria(ideaDTO.getCategoria());
        }
        if (ideaDTO.getPrioridad() != null) {
            idea.setPrioridad(ideaDTO.getPrioridad());
        }
        if (ideaDTO.getObjetivo() != null) {
            idea.setObjetivo(ideaDTO.getObjetivo());
        }

        return ideaRepository.save(idea).getDTO();
    }

    @Override
    @Transactional
    public void deleteIdea(Integer id) {
        Idea idea = ideaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Idea no encontrada"));

        // Solo se puede eliminar si está en generada o rechazada
        if (idea.getEstado() != EstadoIdea.GENERADA && idea.getEstado() != EstadoIdea.RECHAZADA) {
            throw new BadRequestException("Solo se pueden eliminar ideas en estado Generada o Rechazada");
        }

        ideaRepository.delete(idea);
    }

    @Override
    @Transactional
    public IdeaDTO changeEstado(Integer id, EstadoIdea nuevoEstado, Integer userId, Integer analistaId) {
        Idea idea = ideaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Idea no encontrada"));

        // Validar transiciones de estado válidas
        EstadoIdea estadoActual = idea.getEstado();
        if (!isValidTransition(estadoActual, nuevoEstado)) {
            throw new BadRequestException("Transición de estado no válida: " + estadoActual + " -> " + nuevoEstado);
        }

        idea.setEstado(nuevoEstado);

        // Si se aprueba, registrar aprobador y fecha
        if (nuevoEstado == EstadoIdea.APROBADA) {
            User aprobador = userRepository.findById(userId)
                    .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado"));
            idea.setAprobador(aprobador);
            idea.setApprovedAt(LocalDateTime.now());
        }

        // Si se envía a pruebas, asignar analista
        if (nuevoEstado == EstadoIdea.EN_PRUEBA) {
            if (analistaId == null) {
                throw new BadRequestException("Se debe asignar un analista al enviar la idea a pruebas");
            }
            User analista = userRepository.findById(analistaId)
                    .orElseThrow(() -> new ResourceNotFoundException("Analista no encontrado"));
            idea.setAsignadoA(analista);
        }

        return ideaRepository.save(idea).getDTO();
    }

    @Override
    @Transactional
    public IdeaDTO approveIdea(Integer id, Integer userId) {
        return changeEstado(id, EstadoIdea.APROBADA, userId, null);
    }

    @Override
    @Transactional
    public IdeaDTO rejectIdea(Integer id, Integer userId) {
        return changeEstado(id, EstadoIdea.RECHAZADA, userId, null);
    }

    @Override
    @Transactional(readOnly = true)
    public List<IdeaDTO> getIdeasAsignadas(Integer userId) {
        return ideaRepository.findByAsignadoAId(userId).stream()
                .map(Idea::getDTO)
                .collect(java.util.stream.Collectors.toList());
    }

    private void validateIdeaData(IdeaDTO ideaDTO) {
        if (ideaDTO.getTitulo() == null || ideaDTO.getTitulo().trim().isEmpty()) {
            throw new BadRequestException("El título de la idea es requerido");
        }
        if (ideaDTO.getDescripcion() == null || ideaDTO.getDescripcion().trim().isEmpty()) {
            throw new BadRequestException("La descripción es requerida");
        }
        // Objetivo es opcional pero recomendado
        // ProductoOrigenId es opcional (puede ser null si se crea manualmente)
    }

    private boolean isValidTransition(EstadoIdea estadoActual, EstadoIdea nuevoEstado) {
        // Transiciones válidas del nuevo flujo:
        // GENERADA -> EN_REVISION, RECHAZADA
        // EN_REVISION -> APROBADA, RECHAZADA
        // APROBADA -> EN_PRUEBA, RECHAZADA
        // EN_PRUEBA -> PRUEBA_APROBADA, RECHAZADA
        // PRUEBA_APROBADA -> EN_PRODUCCION
        // RECHAZADA -> (no se puede cambiar)
        // EN_PRODUCCION -> (no se puede cambiar)

        if (estadoActual == EstadoIdea.EN_PRODUCCION || estadoActual == EstadoIdea.RECHAZADA) {
            return false; // Estados finales
        }

        switch (estadoActual) {
            case GENERADA:
                return nuevoEstado == EstadoIdea.EN_REVISION || nuevoEstado == EstadoIdea.RECHAZADA;
            case EN_REVISION:
                return nuevoEstado == EstadoIdea.APROBADA || nuevoEstado == EstadoIdea.RECHAZADA;
            case APROBADA:
                return nuevoEstado == EstadoIdea.EN_PRUEBA || nuevoEstado == EstadoIdea.RECHAZADA;
            case EN_PRUEBA:
                return nuevoEstado == EstadoIdea.PRUEBA_APROBADA || nuevoEstado == EstadoIdea.RECHAZADA;
            case PRUEBA_APROBADA:
                return nuevoEstado == EstadoIdea.EN_PRODUCCION;
            default:
                return false;
        }
    }
}

