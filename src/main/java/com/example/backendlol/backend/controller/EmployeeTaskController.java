package com.example.backendlol.backend.controller;

import com.example.backendlol.backend.model.EmployeeTask;
import com.example.backendlol.backend.service.EmployeeTaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/employeetasks")
public class EmployeeTaskController {

    @Autowired
    private EmployeeTaskService employeeTaskService;

    @GetMapping("/all")
    public ResponseEntity<List<EmployeeTask>> getAllTasks() {
        List<EmployeeTask> tasks = employeeTaskService.getAllTasks();
        return ResponseEntity.ok(tasks);
    }

    @GetMapping("/{id}")
    public ResponseEntity<EmployeeTask> getTaskById(@PathVariable Long id) {
        Optional<EmployeeTask> task = employeeTaskService.getTaskById(id);
        return task.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/post")
    public ResponseEntity<EmployeeTask> createTask(@RequestBody EmployeeTask task) {
        EmployeeTask createdTask = employeeTaskService.createTask(task);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdTask);
    }

    @PutMapping("/{id}")
    public ResponseEntity<EmployeeTask> updateTask(@PathVariable Long id, @RequestBody EmployeeTask task) {
        EmployeeTask updatedTask = employeeTaskService.updateTask(id, task);
        return updatedTask != null ? ResponseEntity.ok(updatedTask) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
        employeeTaskService.deleteTask(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<EmployeeTask> updateTaskStatus(@PathVariable Long id, @RequestBody Map<String, String> statusMap) {
        String status = statusMap.get("status");
        if (status == null) {
            return ResponseEntity.badRequest().body(null);
        }
        EmployeeTask updatedTask = employeeTaskService.updateTaskStatus(id, status);
        return updatedTask != null ? ResponseEntity.ok(updatedTask) : ResponseEntity.notFound().build();
    }
    @PutMapping("/{id}/status/{status}")
    public ResponseEntity<EmployeeTask> updateTaskStatus(  @PathVariable Long id,  @PathVariable String status) {
        // Validate the status value
        if (status == null || status.isEmpty()) {
            return ResponseEntity.badRequest().body(null);
        }
        EmployeeTask updatedTask = employeeTaskService.updateTaskStatuss(id, status);
        return updatedTask != null ? ResponseEntity.ok(updatedTask) : ResponseEntity.notFound().build();
    }


    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<List<EmployeeTask>> getTasksByEmployeeId(@PathVariable Long employeeId) {
        List<EmployeeTask> tasks = employeeTaskService.getTasksByEmployeeId(employeeId);
        return ResponseEntity.ok(tasks);
    }
    @GetMapping("/team-lead/{teamLeadId}")
    public ResponseEntity<List<EmployeeTask>> getTasksByTeamLeadId(@PathVariable Long teamLeadId) {
        List<EmployeeTask> tasks = employeeTaskService.getTasksByTeamLeadId(teamLeadId);
        return ResponseEntity.ok(tasks); // Add this endpoint
    }
}
