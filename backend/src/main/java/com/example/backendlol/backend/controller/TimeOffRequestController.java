package com.example.backendlol.backend.controller;

import com.example.backendlol.backend.model.TimeOffRequest;
import com.example.backendlol.backend.service.TimeOffRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/timeoffrequests")
public class TimeOffRequestController {

    @Autowired
    private TimeOffRequestService timeOffRequestService;

    @GetMapping("/by-team-lead/{teamLeadId}")
    public ResponseEntity<List<TimeOffRequest>> getTimeOffRequestsByTeamLeadId(@PathVariable Long teamLeadId) {
        List<TimeOffRequest> requests = timeOffRequestService.getTimeOffRequestsByTeamLeadId(teamLeadId);
        return ResponseEntity.ok(requests);
    }

    @PostMapping
    public ResponseEntity<TimeOffRequest> createTimeOffRequest(@RequestBody TimeOffRequest request) {
        TimeOffRequest savedRequest = timeOffRequestService.saveTimeOffRequest(request);
        return ResponseEntity.ok(savedRequest);
    }

    @GetMapping
    public ResponseEntity<List<TimeOffRequest>> getAllTimeOffRequests() {
        List<TimeOffRequest> requests = timeOffRequestService.getAllTimeOffRequests();
        return ResponseEntity.ok(requests);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TimeOffRequest> updateTimeOffRequest(@PathVariable Long id, @RequestBody TimeOffRequest request) {
        TimeOffRequest updatedRequest = timeOffRequestService.updateTimeOffRequest(id, request);
        if (updatedRequest != null) {
            return ResponseEntity.ok(updatedRequest);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTimeOffRequest(@PathVariable Long id) {
        timeOffRequestService.deleteTimeOffRequest(id);
        return ResponseEntity.noContent().build();
    }
}
