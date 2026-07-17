package com.dodgegame.demo.entity;

import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrePersist;

@Entity
public class Player {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;
    private String username;
    private String email;
    private Long totalGames;
    private Long totalDeaths;
    private Long highestScore;
    private LocalDateTime createdAt;
    private String profilepic;
    @JsonManagedReference
    @OneToMany(mappedBy="player")
    private List<Score> scores;

    @ManyToMany
    @JoinTable(name = "player_achievements",joinColumns = @JoinColumn(name = "player_id"),inverseJoinColumns = @JoinColumn(name="achievement_id"))
    private List<Achievement> achievements;
    
    @JsonManagedReference
    @OneToMany(mappedBy = "player")
    private List<GameSession> gameSession;
    
    public List<Achievement> getAchievements() {
        return achievements;
    }


    public void setAchievements(List<Achievement> achievements) {
        this.achievements = achievements;
    }


    public Player(String username, String email, Long totalGames, Long totalDeaths, Long highestScore,
            LocalDateTime createdAt,String profilepic) {
        this.username = username;
        this.email = email;
        this.totalGames = totalGames;
        this.totalDeaths = totalDeaths;
        this.highestScore = highestScore;
        this.createdAt = createdAt;
        this.profilepic = profilepic;
    }


    public Player() {
    }


    @PrePersist
    public void createdAt(){
        this.createdAt = LocalDateTime.now();
    }


    public Long getId() {
        return id;
    }


    public void setId(Long id) {
        this.id = id;
    }


    public String getUsername() {
        return username;
    }


    public void setUsername(String username) {
        this.username = username;
    }


    public String getEmail() {
        return email;
    }


    public void setEmail(String email) {
        this.email = email;
    }


    public Long getTotalGames() {
        return totalGames;
    }


    public void setTotalGames(Long totalGames) {
        this.totalGames = totalGames;
    }


    public Long getTotalDeaths() {
        return totalDeaths;
    }


    public void setTotalDeaths(Long totalDeaths) {
        this.totalDeaths = totalDeaths;
    }


    public Long getHighestScore() {
        return highestScore;
    }


    public void setHighestScore(Long highestScore) {
        this.highestScore = highestScore;
    }


    public LocalDateTime getCreatedAt() {
        return createdAt;
    }


    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }


    public List<Score> getScores() {
        return scores;
    }


    public void setScores(List<Score> scores) {
        this.scores = scores;
    }

    public List<GameSession> getGameSession() {
        return gameSession;
    }

    public void setGameSession(List<GameSession> gameSession) {
        this.gameSession = gameSession;
    }

    public String getProfilepic() {
        return profilepic;
    }

    public void setProfilepic(String profilepic) {
        this.profilepic = profilepic;
    }
    
}
