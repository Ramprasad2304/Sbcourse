package com.example.backendlol.backend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "employee_schedules")
public class EmployeeSchedule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long employeeId;

    @Column(nullable = false)
    private String employeeUsername;

    @Column(nullable = false)
    private LocalDateTime scheduleDateTime;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(Long employeeId) {
        this.employeeId = employeeId;
    }

    public String getEmployeeUsername() {
        return employeeUsername;
    }

    public void setEmployeeUsername(String employeeUsername) {
        this.employeeUsername = employeeUsername;
    }

    public LocalDateTime getScheduleDateTime() {
        return scheduleDateTime;
    }

    public void setScheduleDateTime(LocalDateTime scheduleDateTime) {
        this.scheduleDateTime = scheduleDateTime;
    }
}
