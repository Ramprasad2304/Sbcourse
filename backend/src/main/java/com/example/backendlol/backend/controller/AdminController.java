package com.example.backendlol.backend.controller;
import org.springframework.beans.factory.annotation.Autowired;
import com.example.backendlol.backend.model.*;
import com.example.backendlol.backend.repository.*;
import com.example.backendlol.backend.service.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;
import org.springframework.http.HttpStatus;
@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = adminService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        User user = adminService.getUserById(id);
        return ResponseEntity.ok(user);
    }

    @PostMapping("/users")
    public ResponseEntity<User> createUser(@RequestBody User user) {
        User newUser = adminService.createUser(user);
        return ResponseEntity.ok(newUser);
    }

    @DeleteMapping("/users/delete/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        try {
            adminService.deleteUser(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User user) {
        try {
            User updatedUser = adminService.updateUser(id, user);
            return ResponseEntity.ok(updatedUser);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Long>> getDashboardStats() {
        Map<String, Long> stats = new HashMap<>();
        stats.put("totalUsers", adminService.getTotalUsers());
        stats.put("totalCompanies", adminService.getTotalCompanies());
        stats.put("totalMessages", adminService.getTotalMessages());
        return ResponseEntity.ok(stats);
    }

    @GetMapping("/pie-chart-data")
    public ResponseEntity<Map<String, Object>> getPieChartData() {
        long employees = adminService.getCountByRole("ROLE_EMPLOYEE");
        long teamLeads = adminService.getCountByRole("ROLE_TEAM_LEAD");
        long productManagers = adminService.getCountByRole("ROLE_PRODUCT_MANAGER");
        long admins = adminService.getCountByRole("ROLE_ADMIN");

        Map<String, Object> response = new HashMap<>();
        response.put("Employees", employees);
        response.put("Team Leads", teamLeads);
        response.put("Product Managers", productManagers);
        response.put("Admins", admins);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/recent-users")
    public ResponseEntity<List<User>> getRecentUsers() {
        List<User> recentUsers = adminService.getRecentUsers();
        return ResponseEntity.ok(recentUsers);
    }
}