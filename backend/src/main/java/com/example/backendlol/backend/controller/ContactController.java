package com.example.backendlol.backend.controller;

import com.example.backendlol.backend.model.ContactMessage;
import com.example.backendlol.backend.service.ContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contact")
public class ContactController {

    @Autowired
    private ContactService contactService;

    @PostMapping("conpost")
    public ResponseEntity<ContactMessage> createContactMessage(@RequestBody ContactMessage contactMessage) {
        ContactMessage savedMessage = contactService.saveContactMessage(contactMessage);
        return ResponseEntity.ok(savedMessage);
    }

    @GetMapping("/conall")
    public ResponseEntity<List<ContactMessage>> getAllContactMessages() {
        List<ContactMessage> messages = contactService.getAllContactMessages();
        return ResponseEntity.ok(messages);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ContactMessage> getContactMessageById(@PathVariable Long id) {
        ContactMessage message = contactService.getContactMessageById(id);
        return ResponseEntity.ok(message);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteContactMessage(@PathVariable Long id) {
        contactService.deleteContactMessage(id);
        return ResponseEntity.noContent().build();
    }
}
