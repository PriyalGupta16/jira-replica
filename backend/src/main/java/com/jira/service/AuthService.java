package com.jira.service;

import java.util.Optional;
import com.jira.jwt.JwtUtil;
import com.jira.model.LoginResponse;
import com.jira.model.User;
import com.jira.repo.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthService(UserRepository userRepository,
                   PasswordEncoder passwordEncoder,
                   JwtUtil jwtUtil) {

    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
    this.jwtUtil = jwtUtil;
}

    public User register(User user) {

        user.setPassword(
                passwordEncoder.encode(user.getPassword())
        );

        return userRepository.save(user);
    }

   public LoginResponse login(String username, String password) {

    Optional<User> user = userRepository.findByUsername(username);

    if (user.isPresent() &&
            passwordEncoder.matches(password, user.get().getPassword())) {

        User u = user.get();

        String token = jwtUtil.generateToken(u.getUsername());

        return new LoginResponse(
                u.getId(),
                token,
                u.getUsername(),
                u.getFullName(),
                u.getEmail(),
                u.getRole().name(),
                u.getDepartment() == null ? "" : u.getDepartment().name(),
                u.getDesignation() == null ? "" : u.getDesignation().name(),
                u.getTeam(),
                u.getProfilePhoto()
        );
    }

    throw new RuntimeException("Invalid Username or Password");
}
    
}