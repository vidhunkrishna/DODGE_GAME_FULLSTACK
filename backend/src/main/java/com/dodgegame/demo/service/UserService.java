package com.dodgegame.demo.service;

import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.dodgegame.demo.entity.Player;
import com.dodgegame.demo.entity.User;
import com.dodgegame.demo.repository.UserRepository;
import com.dodgegame.demo.repository.playerRepository;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final playerRepository playerrepository;
    public UserService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,playerRepository playerrepository) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.playerrepository = playerrepository;
    }

    public User saveUser(User user) {

        user.setPassword(
            passwordEncoder.encode(user.getPassword())
        );
        User saveduser = userRepository.save(user);
        Player player = new Player();
        player.setUsername(saveduser.getUsername());
        player.setEmail(saveduser.getEmail());
        player.setTotalGames(0L);
        player.setTotalDeaths(0L);
        player.setHighestScore(0L);
        playerrepository.save(player);
        return saveduser;
    }

    public List<User> getUsers() {
        return userRepository.findAll();
    }
}