package com.jira.service;

import java.util.Optional;
import com.jira.jwt.JwtUtil;
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

    public String login(String username, String password) {

    Optional<User> user = userRepository.findByUsername(username);

    if (user.isPresent() &&
            passwordEncoder.matches(password, user.get().getPassword())) {

    return jwtUtil.generateToken(user.get().getUsername());
    }

    throw new RuntimeException("Invalid Username or Password");
}
    
}