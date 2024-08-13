    package com.example.backendlol.backend.model;

    import jakarta.persistence.*;

    @Entity
    public class EmployeeTask {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        private Long teamLeadId;
        private Long employeeId;
        private String teamleadusername;
        private String employeeusername;
        private String taskName;
        private String date;
        private String time;

        @Column(nullable = false)
        private String status = "Not Started"; // Default value

        // Getters and Setters

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

        public Long getEmployeeId() {
            return employeeId;
        }

        public void setEmployeeId(Long employeeId) {
            this.employeeId = employeeId;
        }

        public String getTaskName() {
            return taskName;
        }

        public void setTaskName(String taskName) {
            this.taskName = taskName;
        }

        public String getDate() {
            return date;
        }

        public void setDate(String date) {
            this.date = date;
        }

        public String getTime() {
            return time;
        }

        public void setTime(String time) {
            this.time = time;
        }

        public String getStatus() {
            return status;
        }

        public void setStatus(String status) {
            this.status = status;
        }
    }
        