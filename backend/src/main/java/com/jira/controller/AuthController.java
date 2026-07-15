package com.jira.controller;

import com.jira.model.LoginRequest;
import com.jira.model.User;
import com.jira.service.AuthService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return authService.register(user);
    }


    @PostMapping("/login")
public String login(@RequestBody LoginRequest request) {

    return authService.login(
            request.getUsername(),
            request.getPassword()
    );
}
}