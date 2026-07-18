package com.dodgegame.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dodgegame.demo.entity.Score;

public interface ScoreRepository extends JpaRepository<Score, Long> {
    List<Score> findAllByOrderByPlayerscoreDesc();
    List<Score> findTop10ByOrderByPlayerscoreDesc();
}
