package com.dodgegame.demo.service;

import java.util.List;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.dodgegame.demo.entity.Achievement;
import com.dodgegame.demo.entity.Player;
import com.dodgegame.demo.repository.AchievementRepository;
import com.dodgegame.demo.repository.playerRepository;
@Service
public class playerService {
    private final playerRepository playerrepository;
    private final AchievementRepository achievementrepository;

    
    
    public playerService(playerRepository playerrepository, AchievementRepository achievementrepository) {
        this.playerrepository = playerrepository;
        this.achievementrepository = achievementrepository;
    }
    public Player savePlayer(Player player){
        return playerrepository.save(player);
    }
    public List<Player> getAllPlayerList(){
        return playerrepository.findAll();
    }
    public Player getPlayerDetails(){
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return playerrepository.findByEmail(email).orElseThrow();
    }
    public Player addAchievementstoPlayer(Long playerId,Long achievementId){
        Player player = playerrepository.findById(playerId).orElseThrow();
        Achievement achievement = achievementrepository.findById(achievementId).orElseThrow();
        if(!player.getAchievements().contains(achievement)){
        player.getAchievements().add(achievement);
    }
        return playerrepository.save(player);
    }
    public List<Player> getLeaderboard() {
    return playerrepository.findTop10ByOrderByHighestScoreDesc();
}
}
