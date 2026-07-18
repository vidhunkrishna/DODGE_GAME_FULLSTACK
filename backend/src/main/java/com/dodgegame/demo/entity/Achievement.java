package com.dodgegame.demo.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;

@Entity
public class Achievement {
        @Id
        @GeneratedValue(strategy=GenerationType.IDENTITY)
        private Long id;
        private String title;
        private String description;
        @ManyToMany(mappedBy = "achievements")
        @JsonIgnore
        private List<Player> players;
        public List<Player> getPlayers() {
            return players;
        }
        public void setPlayers(List<Player> players) {
            this.players = players;
        }
        public Long getId() {
            return id;
        }
        public void setId(Long id) {
            this.id = id;
        }
        public String getTitle() {
            return title;
        }
        public void setTitle(String title) {
            this.title = title;
        }
        public String getDescription() {
            return description;
        }
        public void setDescription(String description) {
            this.description = description;
        }
        public Achievement() {
        }
        public Achievement(String title, String description) {
            this.title = title;
            this.description = description;
        }
        
        
}
