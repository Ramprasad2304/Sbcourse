package com.example.backendlol.backend.repository;

import com.example.backendlol.backend.model.TimeOffRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TimeOffRequestRepository extends JpaRepository<TimeOffRequest, Long> {
    List<TimeOffRequest> findByTeamLeadId(Long teamLeadId);
}
