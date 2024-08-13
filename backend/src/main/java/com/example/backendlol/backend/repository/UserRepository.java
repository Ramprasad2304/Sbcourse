package com.example.backendlol.backend.repository;

import com.example.backendlol.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.*;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Optional<User> findByUsername(String username);
    @Query("SELECT u FROM User u WHERE u.role IN (:roles)")
    List<User> findByRoles(@Param("roles") List<String> roles);
    List<User> findByRole(String role);


    void deleteById(Long id);

    @Query("SELECT COUNT(DISTINCT u.company) FROM User u")
    long countDistinctCompanies();
    
    @Query("SELECT COUNT(u) FROM User u WHERE u.role = :role")
    long countByRole(@Param("role") String role);
    List<User> findTop10ByOrderByCreatedDateDesc(); // Adjust as needed
}
