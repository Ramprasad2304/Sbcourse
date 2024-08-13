package com.example.backendlol.backend.repository;
import com.example.backendlol.backend.model.ContactMessage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactMessageRepository extends JpaRepository<ContactMessage, Long> {
    long count();
}   