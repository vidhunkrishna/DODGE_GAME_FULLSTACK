package com.dodgegame.demo.service;

import org.springframework.stereotype.Service;

import com.dodgegame.demo.dto.AuthResponse;
import com.dodgegame.demo.entity.Player;
import com.dodgegame.demo.entity.User;
import com.dodgegame.demo.repository.UserRepository;
import com.dodgegame.demo.repository.playerRepository;
import com.dodgegame.demo.security.JWTService;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseToken;

@Service
public class GoogleAuthService {
    private final UserRepository userRepository;
    private final JWTService jwtService;
    private final playerRepository playerrepository;
    public GoogleAuthService(UserRepository userRepository, JWTService jwtService,playerRepository playerrepository) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.playerrepository = playerrepository;
    }
    
    public AuthResponse googleLogin(String token) throws Exception{
        FirebaseToken decodedtoken = FirebaseAuth.getInstance().verifyIdToken(token);
        String email = decodedtoken.getEmail();
        String name = decodedtoken.getName();
        User user = userRepository.findByEmail(email).orElseGet(()->{
            User newUser = new User();
            newUser.setEmail(email);
            newUser.setUsername(name);
            newUser.setPassword("GOOGLE_USER");
            newUser.setRole("USER");
            newUser.setProvider("GOOGLE");
            User saveduser = userRepository.save(newUser);
            return saveduser;
        });
        playerrepository.findByEmail(user.getEmail()).orElseGet(()->{
            Player player = new Player();
            player.setUsername(user.getUsername());
            player.setEmail(user.getEmail());
            player.setTotalGames(0L);
            player.setTotalDeaths(0L);
            player.setHighestScore(0L);
            return playerrepository.save(player);
        });
        String jwt = jwtService.generateToken(user.getEmail());
        return new AuthResponse(jwt);
    }
}
