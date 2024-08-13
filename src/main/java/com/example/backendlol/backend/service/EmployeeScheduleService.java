package com.example.backendlol.backend.service;

import com.example.backendlol.backend.model.EmployeeSchedule;
import com.example.backendlol.backend.repository.EmployeeScheduleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeScheduleService {

    private final EmployeeScheduleRepository employeeScheduleRepository;

    @Autowired
    public EmployeeScheduleService(EmployeeScheduleRepository employeeScheduleRepository) {
        this.employeeScheduleRepository = employeeScheduleRepository;
    }

    public List<EmployeeSchedule> getAllSchedules() {
        return employeeScheduleRepository.findAll();
    }

    public Optional<EmployeeSchedule> getScheduleById(Long id) {
        return employeeScheduleRepository.findById(id);
    }

    public List<EmployeeSchedule> getSchedulesByEmployeeId(Long employeeId) {
        return employeeScheduleRepository.findByEmployeeId(employeeId);
    }

    public List<EmployeeSchedule> getSchedulesByEmployeeUsername(String username) {
        return employeeScheduleRepository.findByEmployeeUsername(username);
    }

    public EmployeeSchedule createSchedule(EmployeeSchedule schedule) {
        return employeeScheduleRepository.save(schedule);
    }

    public EmployeeSchedule updateSchedule(Long id, EmployeeSchedule updatedSchedule) {
        if (employeeScheduleRepository.existsById(id)) {
            updatedSchedule.setId(id);
            return employeeScheduleRepository.save(updatedSchedule);
        }
        return null;
    }

    public void deleteSchedule(Long id) {
        employeeScheduleRepository.deleteById(id);
    }
}
