package com.dodgegame.demo.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dodgegame.demo.entity.Achievement;
import com.dodgegame.demo.service.*;
import java.util.List;

@RestController
@RequestMapping("/achievements")
public class AchievementController {
    
    private final AchievementService achievementService;

    public AchievementController(AchievementService achievementService) {
        this.achievementService = achievementService;
    }
    @PostMapping
public Achievement saveAchievement(@RequestBody Achievement achievement){
    return achievementService.saveAchievement(achievement);
}

@GetMapping
public List<Achievement> getAchievements(){
    return achievementService.getAchievemeList();
}
}
