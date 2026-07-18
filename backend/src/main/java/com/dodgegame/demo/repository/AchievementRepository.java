package com.dodgegame.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dodgegame.demo.entity.Achievement;

public interface AchievementRepository extends JpaRepository<Achievement, Long> {
    
}
