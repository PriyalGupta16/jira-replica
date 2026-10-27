package com.jira.controller;

import com.jira.model.LoginRequest;
import com.jira.model.LoginResponse;
import com.jira.model.Role;
import com.jira.model.User;
import com.jira.repo.UserRepository;
import com.jira.service.AuthService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class AuthController {

    private final AuthService authService;
    private final UserRepository userRepository;

    public AuthController(AuthService authService,
                          UserRepository userRepository) {
        this.authService = authService;
        this.userRepository = userRepository;
    }

   @PostMapping("/register")
public User register(@RequestBody User user) {

    System.out.println("========== REGISTER ==========");
    System.out.println("Full Name : " + user.getFullName());
    System.out.println("Username  : " + user.getUsername());
    System.out.println("Email     : " + user.getEmail());
    System.out.println("Phone     : " + user.getPhone());
    System.out.println("Department: " + user.getDepartment());
    System.out.println("Designation: " + user.getDesignation());
    System.out.println("Team      : " + user.getTeam());

    return authService.register(user);
}
    @PostMapping("/login")
public LoginResponse login(@RequestBody LoginRequest request) {
    return authService.login(
            request.getUsername(),
            request.getPassword()
    );
}

    @GetMapping("/users")
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/managers")
    public List<User> getManagers() {
        return userRepository.findByRole(Role.MANAGER);
    }

    @GetMapping("/employees")
    public List<User> getEmployees() {
        return userRepository.findByRole(Role.EMPLOYEE);
    }

    @DeleteMapping("/users/{id}")
    public void deleteUser(@PathVariable Long id) {
        userRepository.deleteById(id);
    }
}