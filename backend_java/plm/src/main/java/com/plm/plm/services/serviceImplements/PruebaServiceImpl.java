package com.plm.plm.services.serviceImplements;

import com.plm.plm.Config.Exception.BadRequestException;
import com.plm.plm.Config.exception.ResourceNotFoundException;
import com.plm.plm.Enums.EstadoPrueba;
import com.plm.plm.Models.Idea;
import com.plm.plm.Models.Prueba;
import com.plm.plm.Models.ResultadoPrueba;
import com.plm.plm.Models.User;
import com.plm.plm.Reposotory.IdeaRepository;
import com.plm.plm.Reposotory.PruebaRepository;
import com.plm.plm.Reposotory.ResultadoPruebaRepository;
import com.plm.plm.Reposotory.UserRepository;
import com.plm.plm.dto.PruebaDTO;
import com.plm.plm.dto.ResultadoPruebaDTO;
import com.plm.plm.services.PruebaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class PruebaServiceImpl implements PruebaService {

    @Autowired
    private PruebaRepository pruebaRepository;

    @Autowired
    private IdeaRepository ideaRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ResultadoPruebaRepository resultadoPruebaRepository;

    @Override
    @Transactional
    public PruebaDTO createPrueba(PruebaDTO pruebaDTO, Integer userId) {
        validatePruebaData(pruebaDTO);

        Idea idea = ideaRepository.findById(pruebaDTO.getIdeaId())
                .orElseThrow(() -> new ResourceNotFoundException("Idea no encontrada"));

        User analista = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado"));

        Prueba prueba = new Prueba();
        prueba.setIdea(idea);
        prueba.setCodigoMuestra(pruebaDTO.getCodigoMuestra());
        prueba.setTipoPrueba(pruebaDTO.getTipoPrueba());
        prueba.setDescripcion(pruebaDTO.getDescripcion());
        prueba.setEstado(pruebaDTO.getEstado() != null ? pruebaDTO.getEstado() : EstadoPrueba.PENDIENTE);
        prueba.setFechaMuestreo(pruebaDTO.getFechaMuestreo());
        prueba.setFechaInicio(pruebaDTO.getFechaInicio());
        prueba.setFechaFin(pruebaDTO.getFechaFin());
        prueba.setResultado(pruebaDTO.getResultado());
        prueba.setObservaciones(pruebaDTO.getObservaciones());
        prueba.setEquiposUtilizados(pruebaDTO.getEquiposUtilizados());
        prueba.setPruebasRequeridas(pruebaDTO.getPruebasRequeridas());
        prueba.setAnalista(analista);

        return pruebaRepository.save(prueba).getDTO();
    }

    @Override
    @Transactional(readOnly = true)
    public PruebaDTO getPruebaById(Integer id) {
        Prueba prueba = pruebaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Prueba no encontrada"));
        return prueba.getDTO();
    }

    @Override
    @Transactional(readOnly = true)
    public List<PruebaDTO> getPruebasByIdeaId(Integer ideaId) {
        return pruebaRepository.findByIdeaId(ideaId).stream()
                .map(Prueba::getDTO)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<PruebaDTO> getPruebasByAnalistaId(Integer analistaId) {
        return pruebaRepository.findByAnalistaId(analistaId).stream()
                .map(Prueba::getDTO)
                .toList();
    }

    @Override
    @Transactional
    public PruebaDTO updatePrueba(Integer id, PruebaDTO pruebaDTO) {
        Prueba prueba = pruebaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Prueba no encontrada"));

        if (pruebaDTO.getTipoPrueba() != null) {
            prueba.setTipoPrueba(pruebaDTO.getTipoPrueba());
        }
        if (pruebaDTO.getDescripcion() != null) {
            prueba.setDescripcion(pruebaDTO.getDescripcion());
        }
        if (pruebaDTO.getEstado() != null) {
            prueba.setEstado(pruebaDTO.getEstado());
        }
        if (pruebaDTO.getFechaMuestreo() != null) {
            prueba.setFechaMuestreo(pruebaDTO.getFechaMuestreo());
        }
        if (pruebaDTO.getFechaInicio() != null) {
            prueba.setFechaInicio(pruebaDTO.getFechaInicio());
        }
        if (pruebaDTO.getFechaFin() != null) {
            prueba.setFechaFin(pruebaDTO.getFechaFin());
        }
        if (pruebaDTO.getResultado() != null) {
            prueba.setResultado(pruebaDTO.getResultado());
        }
        if (pruebaDTO.getObservaciones() != null) {
            prueba.setObservaciones(pruebaDTO.getObservaciones());
        }
        if (pruebaDTO.getEquiposUtilizados() != null) {
            prueba.setEquiposUtilizados(pruebaDTO.getEquiposUtilizados());
        }
        if (pruebaDTO.getPruebasRequeridas() != null) {
            prueba.setPruebasRequeridas(pruebaDTO.getPruebasRequeridas());
        }

        return pruebaRepository.save(prueba).getDTO();
    }

    @Override
    @Transactional
    public PruebaDTO addResultado(Integer pruebaId, ResultadoPruebaDTO resultadoDTO) {
        Prueba prueba = pruebaRepository.findById(pruebaId)
                .orElseThrow(() -> new ResourceNotFoundException("Prueba no encontrada"));

        ResultadoPrueba resultado = new ResultadoPrueba();
        resultado.setPrueba(prueba);
        resultado.setParametro(resultadoDTO.getParametro());
        resultado.setEspecificacion(resultadoDTO.getEspecificacion());
        resultado.setResultado(resultadoDTO.getResultado());
        resultado.setUnidad(resultadoDTO.getUnidad());
        resultado.setCumpleEspecificacion(resultadoDTO.getCumpleEspecificacion() != null ? resultadoDTO.getCumpleEspecificacion() : true);
        resultado.setObservaciones(resultadoDTO.getObservaciones());
        
        // Establecer created_at manualmente (la auditoría puede no funcionar en todos los casos)
        resultado.setCreatedAt(LocalDateTime.now());

        resultadoPruebaRepository.save(resultado);

        return pruebaRepository.findById(pruebaId).get().getDTO();
    }

    @Override
    @Transactional
    public void deletePrueba(Integer id) {
        Prueba prueba = pruebaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Prueba no encontrada"));
        pruebaRepository.delete(prueba);
    }

    private void validatePruebaData(PruebaDTO pruebaDTO) {
        if (pruebaDTO.getIdeaId() == null) {
            throw new BadRequestException("El ID de la idea es requerido");
        }
        if (pruebaDTO.getCodigoMuestra() == null || pruebaDTO.getCodigoMuestra().trim().isEmpty()) {
            throw new BadRequestException("El código de muestra es requerido");
        }
        if (pruebaDTO.getTipoPrueba() == null || pruebaDTO.getTipoPrueba().trim().isEmpty()) {
            throw new BadRequestException("El tipo de prueba es requerido");
        }
    }
}

