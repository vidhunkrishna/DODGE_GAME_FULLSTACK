package com.dodgegame.demo.service;

import java.util.List;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.dodgegame.demo.entity.GameSession;
import com.dodgegame.demo.entity.Player;
import com.dodgegame.demo.repository.GameSessionRepository;
import com.dodgegame.demo.repository.playerRepository;
@Service
public class GameSessionService {
    private final GameSessionRepository gameSessionRepository;
    private final playerRepository playerrepository;

    public GameSessionService(GameSessionRepository gameSessionRepository,playerRepository playerrepository) {
        this.gameSessionRepository = gameSessionRepository;
        this.playerrepository = playerrepository;
    }

    public GameSession saveGameSession(GameSession gameSession) {

    System.out.println("Deaths received: " + gameSession.getDeaths());
    System.out.println("Score received: " + gameSession.getScore());

    String email = SecurityContextHolder.getContext().getAuthentication().getName();

    System.out.println("==================================");
    System.out.println("Authenticated Email : " + email);

    var optionalPlayer = playerrepository.findByEmail(email);

    System.out.println("Player Exists : " + optionalPlayer.isPresent());

    if (optionalPlayer.isEmpty()) {
        throw new RuntimeException("Player not found for email: " + email);
    }

    Player player = optionalPlayer.get();

    player.setTotalGames(player.getTotalGames() + 1);

    Long deaths = gameSession.getDeaths();
    if (deaths == null) deaths = 0L;

    player.setTotalDeaths(player.getTotalDeaths() + deaths);

    if (gameSession.getScore() > player.getHighestScore()) {
        player.setHighestScore(gameSession.getScore());
    }

    gameSession.setPlayer(player);

    playerrepository.save(player);

    return gameSessionRepository.save(gameSession);
}   

    public List<GameSession> getGameSessions(){
        return gameSessionRepository.findAll();
    }
    public List<GameSession> getGameSessionById(Long playerId){
        return gameSessionRepository.findByPlayerId(playerId);
    }
    
}
