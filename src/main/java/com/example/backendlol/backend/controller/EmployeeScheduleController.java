package com.example.backendlol.backend.controller;

import com.example.backendlol.backend.model.EmployeeSchedule;
import com.example.backendlol.backend.service.EmployeeScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/schedules")
public class EmployeeScheduleController {

    private final EmployeeScheduleService employeeScheduleService;

    @Autowired
    public EmployeeScheduleController(EmployeeScheduleService employeeScheduleService) {
        this.employeeScheduleService = employeeScheduleService;
    }

    @GetMapping
    public ResponseEntity<List<EmployeeSchedule>> getAllSchedules() {
        return ResponseEntity.ok(employeeScheduleService.getAllSchedules());
    }

    @GetMapping("/{id}")
    public ResponseEntity<EmployeeSchedule> getScheduleById(@PathVariable Long id) {
        Optional<EmployeeSchedule> schedule = employeeScheduleService.getScheduleById(id);
        return schedule.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<List<EmployeeSchedule>> getSchedulesByEmployeeId(@PathVariable Long employeeId) {
        return ResponseEntity.ok(employeeScheduleService.getSchedulesByEmployeeId(employeeId));
    }

    @GetMapping("/username/{username}")
    public ResponseEntity<List<EmployeeSchedule>> getSchedulesByEmployeeUsername(@PathVariable String username) {
        return ResponseEntity.ok(employeeScheduleService.getSchedulesByEmployeeUsername(username));
    }

    @PostMapping
    public ResponseEntity<EmployeeSchedule> createSchedule(@RequestBody EmployeeSchedule schedule) {
        EmployeeSchedule createdSchedule = employeeScheduleService.createSchedule(schedule);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdSchedule);
    }

    @PutMapping("/{id}")
    public ResponseEntity<EmployeeSchedule> updateSchedule(
            @PathVariable Long id,
            @RequestBody EmployeeSchedule updatedSchedule) {
        EmployeeSchedule schedule = employeeScheduleService.updateSchedule(id, updatedSchedule);
        return schedule != null ? ResponseEntity.ok(schedule) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSchedule(@PathVariable Long id) {
        employeeScheduleService.deleteSchedule(id);
        return ResponseEntity.noContent().build();
    }
}
