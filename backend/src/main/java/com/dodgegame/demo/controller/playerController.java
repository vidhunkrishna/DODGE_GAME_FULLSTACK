package com.dodgegame.demo.controller;

import java.io.IOException;
import java.util.List;
import java.util.Map;

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

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.dodgegame.demo.entity.Player;
import com.dodgegame.demo.repository.playerRepository;
import com.dodgegame.demo.service.playerService;
@RestController
@RequestMapping("/players")
public class playerController {
   private final playerService playerservice;

   @Autowired
   private playerRepository playerrepo;
   @Autowired
   private Cloudinary cloudinary;
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

         Player player = playerrepo.findByEmail(email)
               .orElseThrow(() -> new RuntimeException("No Player Found"));

         Map<?, ?> uploadResult = cloudinary.uploader().upload(
               image.getBytes(),
               ObjectUtils.emptyMap()
         );

         String imageUrl = uploadResult.get("secure_url").toString();

         player.setProfilepic(imageUrl);
         playerrepo.save(player);

         return imageUrl;
       }catch(Exception e){
         e.printStackTrace();
         throw new RuntimeException(e);
       }
   }
}

