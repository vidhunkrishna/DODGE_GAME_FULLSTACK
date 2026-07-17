package com.dodgegame.demo.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dodgegame.demo.entity.GameSession;
import com.dodgegame.demo.service.*;
import java.util.List;

@RestController
@RequestMapping("/gamesessions")
public class GameSessionController {
    private final GameSessionService gameSessionService;

    public GameSessionController(GameSessionService gameSessionService) {
        this.gameSessionService = gameSessionService;
    }
    @PostMapping
    public GameSession saveGameSession(@RequestBody GameSession gameSession){
        return gameSessionService.saveGameSession(gameSession);
    }
    
    @GetMapping
    public List<GameSession> getGameSession(){
        return gameSessionService.getGameSessions();
    }
    @GetMapping("/players/{playerId}")
    public List<GameSession> getGameSessionByplayerId(@PathVariable Long playerId){
        return gameSessionService.getGameSessionById(playerId);
    }
}
