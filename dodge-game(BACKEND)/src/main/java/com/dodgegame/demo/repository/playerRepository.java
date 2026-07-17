package com.dodgegame.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dodgegame.demo.entity.Player;
import java.util.Optional;
import java.util.List;
public interface playerRepository extends JpaRepository<Player, Long>{
    Optional<Player> findByEmail(String email);
    List<Player> findTop10ByOrderByHighestScoreDesc();
}
