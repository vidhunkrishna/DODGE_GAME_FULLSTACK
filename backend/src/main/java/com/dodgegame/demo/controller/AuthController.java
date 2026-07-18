package com.dodgegame.demo.controller;

import java.util.Optional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dodgegame.demo.dto.AuthResponse;
import com.dodgegame.demo.dto.GoogleAuthRequest;
import com.dodgegame.demo.dto.LoginRequest;
import com.dodgegame.demo.entity.Player;
import com.dodgegame.demo.entity.User;
import com.dodgegame.demo.repository.UserRepository;
import com.dodgegame.demo.repository.playerRepository;
import com.dodgegame.demo.security.JWTService;
import com.dodgegame.demo.service.GoogleAuthService;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final JWTService jwtService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final GoogleAuthService googleAuthService;
    private final playerRepository playerRepository;
    public AuthController(JWTService jwtService, UserRepository userRepository, PasswordEncoder passwordEncoder,
            GoogleAuthService googleAuthService,playerRepository playerRepository) {
        this.jwtService = jwtService;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.googleAuthService = googleAuthService;
        this.playerRepository = playerRepository;
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginRequest request){
        Optional<User> optionaluser = userRepository.findByEmail(request.getEmail());
        if(optionaluser.isEmpty()){
            throw new RuntimeException("User Not Found");
        }
        User user = optionaluser.get();
        boolean matches = passwordEncoder.matches(request.getPassword(), user.getPassword());
        if(!matches){
            throw new RuntimeException("invalid password");
        }
        String token = jwtService.generateToken(user.getEmail());
        return new AuthResponse(token);
    }
    @PostMapping("/google")
    public AuthResponse googleLogin(@RequestBody GoogleAuthRequest request) throws Exception{
        return googleAuthService.googleLogin(request.getToken());
    }
    @PostMapping("/register")
public String register(
        @RequestBody User user
) {

    Optional<User> existingUser =
            userRepository.findByEmail(
                    user.getEmail()
            );

    if(existingUser.isPresent()) {

        return "User already exists";

    }

    user.setPassword(
            passwordEncoder.encode(
                    user.getPassword()
            )
    );

    user.setRole("USER");

    user.setProvider("LOCAL");

    User saveduser = userRepository.save(user);
    Player player = new Player();

player.setUsername(saveduser.getUsername());
player.setEmail(saveduser.getEmail());

player.setHighestScore(0L);
player.setTotalGames(0L);
player.setTotalDeaths(0L);

playerRepository.save(player);

    return "User registered successfully";
}
}
