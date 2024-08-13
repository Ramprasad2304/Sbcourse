
package com.example.backendlol.backend.repository;

import com.example.backendlol.backend.model.EmployeeTask;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.*;

@Repository
public interface EmployeeTaskRepository extends JpaRepository<EmployeeTask, Long> {

    List<EmployeeTask> findByEmployeeId(Long employeeId);
    List<EmployeeTask> findByTeamLeadId(Long teamLeadId);

}
