package com.example.backendlol.backend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "team_lead_schedules")
public class TeamLeadSchedule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long teamLeadId;

    @Column(nullable = false)
    private String teamLeadUsername;

    @Column(nullable = false)
    private LocalDateTime scheduleDateTime;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getTeamLeadId() {
        return teamLeadId;
    }

    public void setTeamLeadId(Long teamLeadId) {
        this.teamLeadId = teamLeadId;
    }

    public String getTeamLeadUsername() {
        return teamLeadUsername;
    }

    public void setTeamLeadUsername(String teamLeadUsername) {
        this.teamLeadUsername = teamLeadUsername;
    }

    public LocalDateTime getScheduleDateTime() {
        return scheduleDateTime;
    }

    public void setScheduleDateTime(LocalDateTime scheduleDateTime) {
        this.scheduleDateTime = scheduleDateTime;
    }

    
}
