package com.dodgegame.demo.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dodgegame.demo.entity.Score;
import com.dodgegame.demo.service.ScoreService;

import jakarta.validation.Valid;
@RestController
@RequestMapping("/scores")
public class ScoreController {
    private final ScoreService scoreservice;

    public ScoreController(ScoreService scoreservice) {
        this.scoreservice = scoreservice;
    }
    
    @PostMapping
    public Score saveScore(@Valid @RequestBody Score score){
        return scoreservice.saveScore(score);
    }

    @GetMapping
    public List<Score> getScores(){
        return scoreservice.getScores();
    }

    @GetMapping("/top")
    public List<Score> gettop10List(){
        return scoreservice.gettop10Scores();
    }
}
