package com.example.backendlol.backend.repository;

import com.example.backendlol.backend.model.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TeamRepository extends JpaRepository<Team, Long> {

    @Query("SELECT t FROM Team t WHERE t.leadId = :leadId")
    List<Team> findByLeadId(@Param("leadId") Long leadId);

    @Query("SELECT t FROM Team t WHERE :employeeId MEMBER OF t.memberIds")
    List<Team> findByEmployeeId(@Param("employeeId") Long employeeId);
}
