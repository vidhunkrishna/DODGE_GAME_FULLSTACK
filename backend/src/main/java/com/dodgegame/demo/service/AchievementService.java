package com.dodgegame.demo.service;

import org.springframework.stereotype.Service;

import com.dodgegame.demo.entity.Achievement;
import com.dodgegame.demo.repository.AchievementRepository;

import java.util.List;
@Service
public class AchievementService {
    private final AchievementRepository achievementRepository;

    public AchievementService(AchievementRepository achievementRepository) {
        this.achievementRepository = achievementRepository;
    }

    public Achievement saveAchievement(Achievement achievement){
        return achievementRepository.save(achievement);
    }
    public List<Achievement> getAchievemeList(){
        return achievementRepository.findAll();
    }
    
    
}
