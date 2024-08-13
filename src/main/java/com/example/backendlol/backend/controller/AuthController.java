package com.example.backendlol.backend.controller;

import com.example.backendlol.backend.dto.LoginRequest;
import com.example.backendlol.backend.dto.TokenRequest;
import com.example.backendlol.backend.model.User;
import com.example.backendlol.backend.service.JwtService;
import com.example.backendlol.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtService jwtService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        if (userService.findByUsername(user.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().body("Username already in use");
        }
        User registeredUser = userService.registerUser(user);
        return ResponseEntity.ok(registeredUser);
    }
    // @PostMapping("/login")
    // public ResponseEntity<?> loginUser(@RequestBody User user) {
    //     Optional<User> optionalUser = userService.findByUsername(user.getUsername());
    //     if (optionalUser.isPresent() && userService.checkPassword(optionalUser.get(), user.getPassword())) {
    //         String token = jwtService.generateToken(user.getUsername());
    //         Map<String, Object> response = new HashMap<>();
         
    //         return ResponseEntity.ok(optionalUser.get());
    //     }
    //     return ResponseEntity.badRequest().body("Invalid email or password");
    // }
    @PostMapping("/login")
public ResponseEntity<?> loginUser(@RequestBody User user) {
    Optional<User> optionalUser = userService.findByUsername(user.getUsername());
    if (optionalUser.isPresent() && userService.checkPassword(optionalUser.get(), user.getPassword())) {
        String token = jwtService.generateToken(user.getUsername());
        Map<String, Object> response = new HashMap<>();
        response.put("user", optionalUser.get());
        response.put("token", token);
        return ResponseEntity.ok(response);
    }
    return ResponseEntity.badRequest().body("Invalid username or password");
}


    
        
    

    @GetMapping("/profile/{username}")
    public ResponseEntity<?> getProfile(@PathVariable String username) {
        Optional<User> userOptional = userService.findByUsername(username);
        return userOptional.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateUser(@RequestBody User user) {
        try {
            User updatedUser = userService.updateUser(user);
            return ResponseEntity.ok(updatedUser);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/verify")
public ResponseEntity<?> verifyToken(@RequestBody TokenRequest tokenRequest) {
    String token = tokenRequest.getToken();
    boolean isValid = jwtService.validateToken(token, jwtService.getUsername(token));
    if (isValid) {
        return ResponseEntity.ok("Token is valid");
    }
    return ResponseEntity.badRequest().body("Invalid token");
}

}
