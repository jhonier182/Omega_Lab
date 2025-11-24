package com.plm.plm.Reposotory;

import com.plm.plm.Enums.EstadoIdea;
import com.plm.plm.Models.Idea;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IdeaRepository extends JpaRepository<Idea, Integer> {
    
    List<Idea> findByEstado(EstadoIdea estado);
    
    List<Idea> findByCategoria(String categoria);
    
    List<Idea> findByPrioridad(String prioridad);
    
    List<Idea> findByCreadorId(Integer creadorId);
    
    List<Idea> findByAsignadoAId(Integer asignadoAId);
    
    List<Idea> findByAsignadoAIdAndEstado(Integer asignadoAId, EstadoIdea estado);
    
    @Query("SELECT i FROM Idea i WHERE " +
           "(:estado IS NULL OR i.estado = :estado) AND " +
           "(:categoria IS NULL OR i.categoria = :categoria) AND " +
           "(:prioridad IS NULL OR i.prioridad = :prioridad) AND " +
           "(:search IS NULL OR LOWER(i.titulo) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(i.descripcion) LIKE LOWER(CONCAT('%', :search, '%')))")
    List<Idea> findByFilters(
        @Param("estado") EstadoIdea estado,
        @Param("categoria") String categoria,
        @Param("prioridad") String prioridad,
        @Param("search") String search
    );
}

