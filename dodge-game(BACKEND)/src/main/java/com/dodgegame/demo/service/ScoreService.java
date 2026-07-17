package com.dodgegame.demo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.dodgegame.demo.entity.Score;
import com.dodgegame.demo.repository.ScoreRepository;
@Service
public class ScoreService {
    private final ScoreRepository scorerepository;
    public ScoreService(ScoreRepository scorerepository){
        this.scorerepository = scorerepository;
    }
    public Score saveScore(Score score){
        return scorerepository.save(score);
    }
    public List<Score> getScores(){
        return scorerepository.findAllByOrderByPlayerscoreDesc();
    }
    public List<Score> gettop10Scores(){
        return scorerepository.findTop10ByOrderByPlayerscoreDesc();
    }
}
