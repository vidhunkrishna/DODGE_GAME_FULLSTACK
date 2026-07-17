package com.dodgegame.demo.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.dodgegame.demo.entity.Player;
import com.dodgegame.demo.repository.playerRepository;
import com.dodgegame.demo.service.playerService;
@RestController
@RequestMapping("/players")
public class playerController {
   private final playerService playerservice;

   @Autowired
   private playerRepository playerrepo;

   public playerController(playerService playerservice) {
    this.playerservice = playerservice;
   }
    
   @PostMapping
   public Player savePlayer(@RequestBody Player player){
    return playerservice.savePlayer(player);
   }
   @GetMapping
   public List<Player> getAllPlayerList(){
    return playerservice.getAllPlayerList();
   }
   @GetMapping("/me")
   public Player getPlayerDetails(){
      return playerservice.getPlayerDetails();
   }
   @PostMapping("/{playerId}/achievements/{achievementId}")
   public Player addAchievementToPlayer(@PathVariable Long playerId,@PathVariable Long achievementId){
    return playerservice.addAchievementstoPlayer(playerId, achievementId);
   }
   @GetMapping("/leaderboard")
   public List<Player> getLeaderboard() {
      return playerservice.getLeaderboard();
   }
   @PostMapping("/upload-pic")
   public String uploadprofile(@RequestParam("image") MultipartFile image) throws IOException{
       System.out.println("UPLOAD CONTROLLER HIT");
       try{
      Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
      String email = authentication.getName();
      Player player = playerrepo.findByEmail(email).orElseThrow(()-> new RuntimeException("No Player Found"));
      String original = image.getOriginalFilename();
      String sub = original.substring(original.lastIndexOf("."));
      String filename = UUID.randomUUID() + sub;
      Path path = Paths.get("uploads");
      Files.copy(image.getInputStream(),path.resolve(filename),StandardCopyOption.REPLACE_EXISTING);
      player.setProfilepic(filename);
      playerrepo.save(player);
      return "http://localhost:8080/uploads/"+filename;
       }catch(Exception e){
         e.printStackTrace();
         throw new RuntimeException(e);
       }
   }
}

