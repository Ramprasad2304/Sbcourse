package com.example.backendlol.backend.controller;

import com.example.backendlol.backend.model.Team;
import com.example.backendlol.backend.model.Project;
import com.example.backendlol.backend.model.User;
import com.example.backendlol.backend.service.TeamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.Arrays;
import java.util.Collections;

import java.util.Map;

@RestController
@RequestMapping("/api/teams")
public class TeamController {

    @Autowired
    private TeamService teamService;

   
    @GetMapping
    public List<Team> getAllTeams() {
        List<Team> teams = teamService.getAllTeams();
        return enrichTeamsWithUsernames(teams);
    }

        @GetMapping("/{id}")
        public ResponseEntity<Team> getTeamById(@PathVariable Long id) {
            Optional<Team> team = teamService.getTeamById(id);
            return team.map(t -> ResponseEntity.ok(enrichTeamWithUsernames(t)))
                    .orElseGet(() -> ResponseEntity.notFound().build());
        }

    private Team enrichTeamWithUsernames(Team team) {
        User lead = teamService.getUserById(team.getLeadId());
        List<User> members = teamService.getUsersByIds(team.getMemberIds());

        // Set usernames
        team.setLeadUsername(lead != null ? lead.getUsername() : "Unknown");
        team.setMemberUsernames(members.stream()
                                       .map(User::getUsername)
                                       .collect(Collectors.toList()));
        return team;
    }

    private List<Team> enrichTeamsWithUsernames(List<Team> teams) {
        return teams.stream()
                    .map(this::enrichTeamWithUsernames)
                    .collect(Collectors.toList());
    }
    @PostMapping
    public ResponseEntity<Team> createTeam(@RequestBody Team team) {
        Team createdTeam = teamService.createTeam(team);
        return ResponseEntity.ok(createdTeam);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Team> updateTeam(@PathVariable Long id, @RequestBody Team team) {
        try {
            Team updatedTeam = teamService.updateTeam(id, team);
            return ResponseEntity.ok(updatedTeam);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTeam(@PathVariable Long id) {
        teamService.deleteTeam(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/projects")
    public List<Project> getProjects() {
        return teamService.getAllProjects();
    }

    @GetMapping("/users/team_lead")
    public List<User> getTeamLeads() {
        return teamService.getUsersByRoles(Collections.singletonList("team_lead"));
    }
    
    @GetMapping("/users/employee")
    public List<User> getEmployees() {
        return teamService.getUsersByRoles(Collections.singletonList("employee"));
    }
    // @GetMapping("/by-lead/{leadUsername}")
    // public ResponseEntity<List<Team>> getTeamsByLeadUsername(@PathVariable String leadUsername) {
    //     List<Team> teams = teamService.findTeamsByLeadUsername(leadUsername);
    //     return ResponseEntity.ok(teams);
    // }

    // @GetMapping("/by-employee/{employeeUsername}")
    // public ResponseEntity<List<Team>> getTeamsByEmployeeUsername(@PathVariable String employeeUsername) {
    //     List<Team> teams = teamService.findTeamsByEmployeeUsername(employeeUsername);
    //     return ResponseEntity.ok(teams);
    // }
    @GetMapping("/by-lead/{leadId}")
    public ResponseEntity<List<Team>> getTeamsByLeadId(@PathVariable Long leadId) {
        List<Team> teams = teamService.getTeamsByLeadId(leadId);
        if (teams != null) {
            List<Team> enrichedTeams = enrichTeamsWithUsernames(teams);
            return ResponseEntity.ok(enrichedTeams);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/by-employee/{employeeId}")
    public ResponseEntity<List<Team>> getTeamsByEmployeeId(@PathVariable Long employeeId) {
        List<Team> teams = teamService.getTeamsByEmployeeId(employeeId);
        if (teams != null) {
            List<Team> enrichedTeams = enrichTeamsWithUsernames(teams);
            return ResponseEntity.ok(enrichedTeams);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    
    
}
