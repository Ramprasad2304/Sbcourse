package com.example.backendlol.backend.controller;

import com.example.backendlol.backend.model.EmployeeTimeoff;
import com.example.backendlol.backend.service.EmployeeTimeoffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.backendlol.backend.repository.EmployeeTimeoffRepository;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/timeoffs")
public class EmployeeTimeoffController {

    @Autowired
    private EmployeeTimeoffService employeeTimeoffService;

    @Autowired
    private EmployeeTimeoffRepository employeeTimeoffRepository;

    @GetMapping
    public List<EmployeeTimeoff> getAllTimeoffs() {
        return employeeTimeoffService.getAllTimeoffs();
    }

    @GetMapping("/{id}")
    public ResponseEntity<EmployeeTimeoff> getTimeoffById(@PathVariable Long id) {
        Optional<EmployeeTimeoff> employeeTimeoff = employeeTimeoffService.getTimeoffById(id);
        return employeeTimeoff.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public EmployeeTimeoff createTimeoff(@RequestBody EmployeeTimeoff employeeTimeoff) {
        return employeeTimeoffService.createTimeoff(employeeTimeoff);
    }

    @PutMapping("/{id}")
    public ResponseEntity<EmployeeTimeoff> updateTimeoff(@PathVariable Long id, @RequestBody EmployeeTimeoff employeeTimeoff) {
        EmployeeTimeoff updatedTimeoff = employeeTimeoffService.updateTimeoff(id, employeeTimeoff);
        return updatedTimeoff != null ? ResponseEntity.ok(updatedTimeoff) : ResponseEntity.notFound().build();
    }

    @PutMapping("/update-status/{id}")
    public ResponseEntity<EmployeeTimeoff> updateStatus(@PathVariable Long id, @RequestBody EmployeeTimeoff statusUpdate) {
        Optional<EmployeeTimeoff> existingRequest = employeeTimeoffRepository.findById(id);
        if (existingRequest.isPresent()) {
            EmployeeTimeoff request = existingRequest.get();
            request.setStatus(statusUpdate.getStatus()); // Update only status
            EmployeeTimeoff updatedRequest = employeeTimeoffRepository.save(request);
            return ResponseEntity.ok(updatedRequest);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTimeoff(@PathVariable Long id) {
        employeeTimeoffService.deleteTimeoff(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/by-employee/{employeeName}")
    public List<EmployeeTimeoff> getTimeoffsByEmployeeName(@PathVariable String employeeName) {
        return employeeTimeoffService.getTimeoffsByEmployeeName(employeeName);
    }
}
