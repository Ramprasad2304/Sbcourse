package com.example.backendlol.backend.service;

import com.example.backendlol.backend.model.EmployeeTimeoff;
import com.example.backendlol.backend.repository.EmployeeTimeoffRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeTimeoffService {

    @Autowired
    private EmployeeTimeoffRepository employeeTimeoffRepository;

    public List<EmployeeTimeoff> getAllTimeoffs() {
        return employeeTimeoffRepository.findAll();
    }

    public Optional<EmployeeTimeoff> getTimeoffById(Long id) {
        return employeeTimeoffRepository.findById(id);
    }

    public EmployeeTimeoff createTimeoff(EmployeeTimeoff employeeTimeoff) {
        return employeeTimeoffRepository.save(employeeTimeoff);
    }

    public EmployeeTimeoff updateTimeoff(Long id, EmployeeTimeoff employeeTimeoff) {
        if (employeeTimeoffRepository.existsById(id)) {
            employeeTimeoff.setId(id);
            return employeeTimeoffRepository.save(employeeTimeoff);
        }
        return null;
    }

    public void deleteTimeoff(Long id) {
        employeeTimeoffRepository.deleteById(id);
    }

    public List<EmployeeTimeoff> getTimeoffsByEmployeeName(String employeeName) {
        return employeeTimeoffRepository.findByEmployeeName(employeeName);
    }
}
