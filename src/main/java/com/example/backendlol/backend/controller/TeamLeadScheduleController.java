package com.example.backendlol.backend.controller;
import com.example.backendlol.backend.repository.*;
import com.example.backendlol.backend.service.*;
import com.example.backendlol.backend.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/product_manager/schedule")
public class TeamLeadScheduleController {

    @Autowired
    private TeamLeadScheduleService teamLeadScheduleService; // Service for business logic

    // Endpoint to fetch all team leads
    @GetMapping("/team_leads")
    public ResponseEntity<List<User>> getAllTeamLeads() {
        List<User> teamLeads = teamLeadScheduleService.getAllTeamLeads();
        return ResponseEntity.ok(teamLeads);
    }

    // Endpoint to get the schedule of a specific team lead
    @GetMapping("/schedule/{teamLeadId}")
    public ResponseEntity<List<TeamLeadSchedule>> getTeamLeadSchedule(@PathVariable Long teamLeadId) {
        List<TeamLeadSchedule> schedules = teamLeadScheduleService.getSchedulesForTeamLead(teamLeadId);
        if (schedules != null && !schedules.isEmpty()) {
            return ResponseEntity.ok(schedules);
        } else {
            return ResponseEntity.noContent().build(); // Use noContent() for empty lists
        }
    }
    

    @PostMapping("/schedule")
    public ResponseEntity<TeamLeadSchedule> createOrUpdateSchedule(@RequestBody TeamLeadSchedule schedule) {
        TeamLeadSchedule savedSchedule = teamLeadScheduleService.saveOrUpdateSchedule(schedule);
        return ResponseEntity.ok(savedSchedule);
    }
    @PutMapping("/schedule/{id}")
    public ResponseEntity<TeamLeadSchedule> updateSchedule(@PathVariable Long id, @RequestBody TeamLeadSchedule schedule) {
        TeamLeadSchedule updatedSchedule = teamLeadScheduleService.updateSchedule(id, schedule);
        if (updatedSchedule != null) {
            return ResponseEntity.ok(updatedSchedule);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    // Endpoint to delete a schedule
    @DeleteMapping("/schedule/{id}")
    public ResponseEntity<Void> deleteSchedule(@PathVariable Long id) {
        boolean isDeleted = teamLeadScheduleService.deleteSchedule(id);
        if (isDeleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}