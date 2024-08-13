package com.example.backendlol.backend.repository;

import com.example.backendlol.backend.model.EmployeeSchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmployeeScheduleRepository extends JpaRepository<EmployeeSchedule, Long> {

    // Custom query to find schedules by employee ID
    List<EmployeeSchedule> findByEmployeeId(Long employeeId);

    // Custom query to find schedules by employee username
    List<EmployeeSchedule> findByEmployeeUsername(String employeeUsername);

}
