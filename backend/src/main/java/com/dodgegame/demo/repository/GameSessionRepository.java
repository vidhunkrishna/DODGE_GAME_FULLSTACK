package com.dodgegame.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dodgegame.demo.entity.GameSession;
import java.util.List;
public interface GameSessionRepository extends JpaRepository<GameSession, Long>{
    public List<GameSession> findByPlayerId(Long playerId);
}
