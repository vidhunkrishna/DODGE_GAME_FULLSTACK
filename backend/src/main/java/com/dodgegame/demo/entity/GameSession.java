package com.dodgegame.demo.entity;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;

@Entity
public class GameSession {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long score;
    private Long survivalTime;
    private LocalDateTime playedAt;
    private String difficulty;
    private Long deaths;
    @ManyToOne
    @JsonBackReference
    private Player player;
    

public Long getDeaths() {
    return deaths;
}

public void setDeaths(Long deaths) {
    this.deaths = deaths;
}
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public long getScore() {
        return score;
    }
    public void setScore(Long score) {
        this.score = score;
    }
    public Long getSurvivalTime() {
        return survivalTime;
    }
    public void setSurvivalTime(Long survivalTime) {
        this.survivalTime = survivalTime;
    }
    public LocalDateTime getPlayedAt() {
        return playedAt;
    }
    public void setPlayedAt(LocalDateTime playedAt) {
        this.playedAt = playedAt;
    }
    public String getDifficulty() {
        return difficulty;
    }
    public void setDifficulty(String difficulty) {
        this.difficulty = difficulty;
    }
    public Player getPlayer() {
        return player;
    }
    public void setPlayer(Player player) {
        this.player = player;
    }
    public GameSession() {
    }
    public GameSession(Long score, Long survivalTime, Long deaths, LocalDateTime playedAt, String difficulty,
            Player player) {
        this.score = score;
        this.survivalTime = survivalTime;
        this.playedAt = playedAt;
        this.difficulty = difficulty;
        this.player = player;
        this.deaths = deaths;
    }
    @PrePersist
public void playedAt(){
    this.playedAt = LocalDateTime.now();
}
}
