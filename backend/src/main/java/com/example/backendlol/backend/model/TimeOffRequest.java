package com.example.backendlol.backend.model;
import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class TimeOffRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long teamLeadId;
    private String teamLeadName;
    private String reason;
    private String status; // e.g., "pending", "approved", "rejected"
    private LocalDate requestDate;
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
    public String getTeamLeadName() {
        return teamLeadName;
    }
    public void setTeamLeadName(String teamLeadName) {
        this.teamLeadName = teamLeadName;
    }
    public String getReason() {
        return reason;
    }
    public void setReason(String reason) {
        this.reason = reason;
    }
    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }
    public LocalDate getRequestDate() {
        return requestDate;
    }
    public void setRequestDate(LocalDate requestDate) {
        this.requestDate = requestDate;
    }

    
}
