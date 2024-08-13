package com.example.backendlol.backend.repository;
import com.example.backendlol.backend.model.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.*;
@Repository
public interface TeamLeadScheduleRepository extends JpaRepository<TeamLeadSchedule, Long> {
    // Method to find TeamLeadSchedule by team lead's ID
    List<TeamLeadSchedule> findByTeamLeadId(Long teamLeadId);
}