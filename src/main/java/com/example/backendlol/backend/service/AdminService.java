
package com.example.backendlol.backend.service;

import com.example.backendlol.backend.model.User;
import com.example.backendlol.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import com.example.backendlol.backend.repository.*;
import com.example.backendlol.backend.model.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import java.util.stream.StreamSupport;
import java.util.*;

@Service
public class AdminService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ContactMessageRepository contactMessageRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(Long id) {
        Optional<User> userOptional = userRepository.findById(id);
        if (userOptional.isPresent()) {
            return userOptional.get();
        } else {
            throw new RuntimeException("User not found with id " + id);
        }
    }

    public User createUser(User user) {
        user.setCreatedDate(LocalDateTime.now());
        return userRepository.save(user);
    }

    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new RuntimeException("User not found with id " + id);
        }
        userRepository.deleteById(id);
    }

    public User updateUser(Long id, User userDetails) {
        User user = getUserById(id);
        user.setFirstName(userDetails.getFirstName());
        user.setLastName(userDetails.getLastName());
        user.setUsername(userDetails.getUsername());
        user.setEmail(userDetails.getEmail());
        if (userDetails.getPassword() != null && !userDetails.getPassword().isEmpty()) {
            user.setPassword(passwordEncoder.encode(userDetails.getPassword()));
        }
        user.setCompany(userDetails.getCompany());
        user.setRole(userDetails.getRole());
        return userRepository.save(user);
    }

    public long getTotalUsers() {
        return userRepository.count();
    }

    public long getTotalCompanies() {
        return userRepository.countDistinctCompanies();
    }

    public long getTotalMessages() {
        return contactMessageRepository.count();
    }

    public Map<String, Long> getRoleDistribution() {
        List<User> users = userRepository.findAll();
        return users.stream()
                .map(User::getRole)
                .collect(Collectors.groupingBy(Function.identity(), Collectors.counting()));
    }

    public long getCountByRole(String role) {
        return userRepository.countByRole(role);
    }

    public List<User> getRecentUsers() {
        return userRepository.findTop10ByOrderByCreatedDateDesc(); // Adjust as needed
    }
}
