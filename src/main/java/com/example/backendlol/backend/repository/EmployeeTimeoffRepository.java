package com.example.backendlol.backend.repository;

import com.example.backendlol.backend.model.EmployeeTimeoff;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmployeeTimeoffRepository extends JpaRepository<EmployeeTimeoff, Long> {
    List<EmployeeTimeoff> findByEmployeeName(String employeeName);
}
