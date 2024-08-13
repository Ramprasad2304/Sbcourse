package com.example.backendlol.backend.service;

import com.example.backendlol.backend.model.Team;
import com.example.backendlol.backend.model.User;
import com.example.backendlol.backend.model.Project;
import com.example.backendlol.backend.repository.TeamRepository;
import com.example.backendlol.backend.repository.ProjectRepository;
import com.example.backendlol.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TeamService {

    @Autowired
    private TeamRepository teamRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProjectRepository projectRepository;

    public List<Team> getAllTeams() {
        return teamRepository.findAll();
    }

    public Optional<Team> getTeamById(Long id) {
        return teamRepository.findById(id);
    }

    public Team createTeam(Team team) {
        Project project = projectRepository.findById(team.getProject().getId())
                .orElseThrow(() -> new IllegalArgumentException("Project ID does not exist"));
        team.setProject(project);
        return teamRepository.save(team);
    }

    public Team updateTeam(Long id, Team team) {
        if (!teamRepository.existsById(id)) {
            throw new IllegalArgumentException("Team ID does not exist");
        }
        
        Optional<Project> project = projectRepository.findById(team.getProject().getId());
        if (project.isEmpty()) {
            throw new IllegalArgumentException("Project ID does not exist");
        }
        
        // Validate team lead
        if (!userRepository.existsById(team.getLeadId())) {
            throw new IllegalArgumentException("Team Lead ID does not exist");
        }
        
        // Validate team members
        if (team.getMemberIds() != null) {
            for (Long memberId : team.getMemberIds()) {
                if (!userRepository.existsById(memberId)) {
                    throw new IllegalArgumentException("One or more Member IDs do not exist");
                }
            }
        }
        
        team.setId(id);
        return teamRepository.save(team);
    }

    public void deleteTeam(Long id) {
        teamRepository.deleteById(id);
    }

    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    public List<User> getUsersByRoles(List<String> roles) {
        return userRepository.findByRoles(roles);
    }
    public User getUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    // Fetch users by IDs
    public List<User> getUsersByIds(List<Long> ids) {
        return userRepository.findAllById(ids);
    }
    // public List<Team> findTeamsByLeadUsername(String leadUsername) {
    //     return teamRepository.findByLeadUsername(leadUsername);
    // }

    // public List<Team> findTeamsByEmployeeUsername(String employeeUsername) {
    //     return teamRepository.findByEmployeeUsername(employeeUsername);
    // }
    public List<Team> getTeamsByLeadId(Long leadId) {
        return teamRepository.findByLeadId(leadId);
    }

    public List<Team> getTeamsByEmployeeId(Long employeeId) {
        return teamRepository.findByEmployeeId(employeeId);
    }
}
