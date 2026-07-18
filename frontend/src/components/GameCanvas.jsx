import { useRef, useEffect } from "react";
import { spawnparticles, spawntrail } from "../utils/particles";
import { isColliding } from "../utils/collisions";
import {
  gameoveraud,
  dashaud,
  nearmissaud,
  shieldbreakaud,
  poweruppickupaud,
  laserloadingaud,
  laserhitaud,
  gameplaymusic,
  menuaud,
  setAudioMuted,
} from "../systems/audio";
import { checkAchievements } from "../systems/achievements";
import { spawnLaser, updateLasers } from "../systems/lasers";
import {
  checkEventStart,
  updateEventTimer,
  getSpawnChances,
} from "../systems/events";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function GameCanvas({ onGameStart, onGameEnd }) {
  const canvasRef = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let warningtime = 0;
    let lastPatternTime = 0;
    let wallActive = false;
    let nearmiss = 0;
    let gamestate = "menu";
    let gameover = false;
    let sessionsaved = false;
    let score = 0;
    let gameStartTime = Date.now();
    let paused = false;
    let muted = false;
    let difficulty = "easy";
    let bgtime = 0;
    let playerColor = "blue";

    let shakestrength = 0;
    let shaketime = 0;
    let flashtime = 0;

    let dashactive = false;
    let dashtime = 0;
    let dashcooldown = 0;
    let ntext = 0;
    let slowEffect = 0;
    let scoreBoost = 0;
    let particles = [];
    let hasshield = false;
    let shieldtime = 0;
    let nearmisscooldown = 0;
    let combo = 0;
    let combotime = 0;
    let scoremultiplier = 1;
    let deaths = 1;
    let invincibletime = 0;
    let highscore = localStorage.getItem("highscore") || 0;
    let highscoretexttime = 0;
    let highscorebroken = false;
    let targetzoom = 1;
    let camerazoom = 1;
    let zoomtimer = 0;
    let currentevent = "";
    let eventtime = 0;
    let lasteventtime = 0;

    let achievements = [];
    let achievementtext = "";
    let achievementtime = 0;
    let lasers = [];
    const saveGameSession = async () => {
      const token = localStorage.getItem("jwt");
      
      const survivalTime = Math.floor((Date.now() - gameStartTime) / 1000);
      
      await axios.post(
        "https://dodge-game-fullstack.onrender.com/gamesessions",

        {
          score: score,
          survivalTime: survivalTime,
          difficulty: difficulty,
          deaths: deaths,
        },

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
    };
    function resizecanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    window.addEventListener("resize", resizecanvas);
    resizecanvas();

    const player = {
      x: 200,
      y: 200,
      height: 50,
      width: 50,
      speed: 5,
    };

    const difficultysetting = {
      easy: { speed: 3, spawnrate: 1200 },
      mid: { speed: 4, spawnrate: 800 },
      hard: { speed: 6, spawnrate: 500 },
      extreme: { speed: 8, spawnrate: 300 },
    };
    const specialSpawnChance = {
      easy: 0.01,
      mid: 0.03,
      hard: 0.05,
      extreme: 0.08,
    };
    const powerupChance = {
      easy: 0.03,
      mid: 0.025,
      hard: 0.02,
      extreme: 0.015,
    };
    const key = {};
    window.addEventListener("keydown", (e) => {
      key[e.key] = true;
    });
    window.addEventListener("keyup", (e) => {
      key[e.key] = false;
    });

    const obstacles = [];

    const powerups = [];

    function spawnzigzag() {
      obstacles.push({
        x: Math.random() * (canvas.width - 2),
        y: -20,
        height: 20,
        width: 20,
        speed: 3,
        type: "zigzag",
      });
    }
    function spawntrackingobstacles() {
      obstacles.push({
        x: Math.random() * (canvas.width - 20),
        y: -20,
        width: 20,
        height: 20,
        speed: 3,
        type: "tracking",
      });
    }
    function spawnobstacles() {
      obstacles.push({
        x: Math.random() * (canvas.width - 40),
        y: -40,
        width: 15,
        height: 15,
        speed: difficultysetting[difficulty].speed,
      });
    }

    function spawnPowerup() {
      const types = ["slow", "score", "shield"];
      const type = types[Math.floor(Math.random() * types.length)];

      powerups.push({
        x: Math.random() * (canvas.width - 20),
        y: -20,
        width: 20,
        height: 20,
        speed: 3,
        type: type,
      });
    }

    function spawnwallpattern() {
      if (player.y > canvas.height - 120) return;
      let gapsize = 160;
      if (difficulty === "hard") gapsize = 140;
      if (difficulty === "extreme") gapsize = 120;

      const blockwidth = 20;

      const predictedx =
        player.x + (key["ArrowRight"] ? 50 : key["ArrowLeft"] ? -50 : 0);

      const playercentre = predictedx + player.width / 2;
      const offset = (Math.random() - 0.5) * 40;

      const minCenter = gapsize / 2 + 40;
      const maxCenter = canvas.width - gapsize / 2 - 40;

      const safeCenter = Math.max(minCenter, Math.min(maxCenter, playercentre));

      let gapx = safeCenter - gapsize / 2;

      gapx += (Math.random() - 0.5) * 40;

      gapx = Math.max(0, Math.min(canvas.width - gapsize, gapx));

      for (let x = 0; x < canvas.width; x += blockwidth) {
        if (x >= gapx && x <= gapx + gapsize) continue;

        obstacles.push({
          x: x,
          y: -20,
          width: blockwidth,
          height: 20,
          speed: difficultysetting[difficulty].speed,
        });
      }

      wallActive = true;
    }

    const scoreinterval = setInterval(() => {
      if (!gameover && !paused && gamestate === "playing") {
        let multiplier = 1;

        if (scoreBoost > 0) multiplier *= 2;
        score += multiplier * scoremultiplier;
      }
    }, 1000);

    const obsinterval = setInterval(() => {
      if (!gameover && !paused && gamestate === "playing") {
        if (warningtime > 0) return;
        const { spawnChance, laserHellChance } = getSpawnChances(
          difficulty,
          currentevent,
        );

        const patternChance = 0.15;
        const now = Date.now();

        if (
          Math.random() < patternChance &&
          now - lastPatternTime > 3000 &&
          obstacles.length < 50 &&
          !wallActive
        ) {
          warningtime = 30;

          setTimeout(() => {
            spawnwallpattern();
            lastPatternTime = Date.now();
          }, 500);
        } else if (!wallActive && Math.random() < spawnChance[difficulty]) {
          spawnobstacles();
        }
        if (!wallActive && Math.random() < specialSpawnChance[difficulty]) {
          spawntrackingobstacles();
        }
        if (Math.random() < powerupChance[difficulty]) {
          spawnPowerup();
        }
        if (
          Math.random() < specialSpawnChance[difficulty] * 0.6 &&
          !wallActive
        ) {
          spawnzigzag();
        }
        if (
          currentevent !== "laserhell" &&
          Math.random() < specialSpawnChance[difficulty] * 0.3
        ) {
          spawnLaser(lasers, laserloadingaud, canvas.width);
        }
        if (
          currentevent === "laserhell" &&
          Math.random() < laserHellChance[difficulty]
        ) {
          spawnLaser(lasers, laserloadingaud, canvas.width);
        }
      }
    }, 200);

    function Restartgame() {
      player.x = 200;
      player.y = 200;
      obstacles.length = 0;
      powerups.length = 0;
      gamestate = "playing";
      lasteventtime = Date.now();
      gameover = false;
      score = 0;
      wallActive = false;
      targetzoom = 1;
      camerazoom = 1;
      highscorebroken = false;
      gameplaymusic.pause();
      gameplaymusic.currentTime = 0;
      gameplaymusic.play().catch(() => {});
      key["r"] = false;
      sessionsaved = false;
      gameStartTime = Date.now();
    }

    function update() {
      bgtime += 0.03;
      const now = Date.now();
      const eventStart = checkEventStart(
        gamestate,
        gameover,
        now,
        lasteventtime,
        eventtime,
      );
      if (eventStart) {
        currentevent = eventStart.currentevent;
        eventtime = eventStart.eventtime;
        lasteventtime = eventStart.lasteventtime;
      }
      if (gamestate === "menu") {
        if (menuaud.paused) {
          menuaud.play().catch(() => {});
        }
        if (key["Enter"]) {
          difficulty = "easy";
          gamestate = "playing";
          onGameStart?.();
          lasteventtime = Date.now();
          gameplaymusic.play().catch(() => {});
          menuaud.pause();
          menuaud.currentTime = 0;
          key["Enter"] = false;
        }
        if (key["1"]) {
          difficulty = "easy";
          gamestate = "playing";
          onGameStart?.();
          lasteventtime = Date.now();
          gameplaymusic.play().catch(() => {});
          menuaud.pause();
          menuaud.currentTime = 0;
        }
        if (key["2"]) {
          difficulty = "mid";
          gamestate = "playing";
          onGameStart?.();
          lasteventtime = Date.now();
          gameplaymusic.play().catch(() => {});
          menuaud.pause();
          menuaud.currentTime = 0;
        }
        if (key["3"]) {
          difficulty = "hard";
          gamestate = "playing";
          onGameStart?.();
          lasteventtime = Date.now();
          gameplaymusic.play().catch(() => {});
          menuaud.pause();
          menuaud.currentTime = 0;
        }
        if (key["4"]) {
          difficulty = "extreme";
          gamestate = "playing";
          onGameStart?.();
          lasteventtime = Date.now();
          gameplaymusic.play().catch(() => {});
          menuaud.pause();
          menuaud.currentTime = 0;
        }

        if (key["q"]) playerColor = "blue";
        if (key["w"]) playerColor = "green";
        if (key["e"]) playerColor = "yellow";
        if (key["r"]) playerColor = "purple";
        return;
      }
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.life--;
      });

      particles = particles.filter((p) => p.life > 0);
      if (gameover) {
        gameplaymusic.pause();
        if (key["r"] == true || key["R"] == true) {
          onGameStart?.();
          Restartgame();
        }
        return;
      }

      if (key["p"]) {
        paused = !paused;
        key["p"] = false;
      }
      if (key["m"]) {
        muted = !muted;

        setAudioMuted(muted);

        key["m"] = false;
      }

      if (paused) return;

      if (
        key["Shift"] &&
        dashcooldown <= 0 &&
        !dashactive &&
        (key["ArrowLeft"] ||
          key["ArrowRight"] ||
          key["ArrowUp"] ||
          key["ArrowDown"])
      ) {
        dashactive = true;
        dashaud.currentTime = 0;
        dashaud.play().catch(() => {});
        dashtime = 10;
        dashcooldown = 60;
        spawnparticles(
          particles,
          player.x + player.width / 2,
          player.y + player.height / 2,
        );
        targetzoom = 1.05;
        zoomtimer = 7;
      }

      let currentspeed = player.speed;
      if (dashactive) {
        currentspeed = player.speed * 3;
      }
      if (key["ArrowLeft"]) player.x -= currentspeed;
      if (key["ArrowRight"]) player.x += currentspeed;
      if (key["ArrowUp"]) player.y -= currentspeed;
      if (key["ArrowDown"]) player.y += currentspeed;
      if (dashactive) {
        dashtime--;
        if (dashtime <= 0) {
          dashactive = false;
        }
      }

      if (dashcooldown > 0) dashcooldown--;
      if (
        key["ArrowLeft"] ||
        key["ArrowRight"] ||
        key["ArrowDown"] ||
        key["ArrowUp"]
      ) {
        spawntrail(particles, player);
      }
      if (player.x < 0) player.x = 0;
      if (player.x + player.width > canvas.width)
        player.x = canvas.width - player.width;

      if (player.y < 0) player.y = 0;
      if (player.y + player.height > canvas.height)
        player.y = canvas.height - player.height;

      let wallStillExists = false;

      obstacles.forEach((obstacle) => {
        const speedMultiplier = slowEffect > 0 ? 0.5 : 1;
        if (obstacle.type === "tracking") {
          const playerCenter = player.x + player.width / 2;
          const obstacleCenter = obstacle.x + obstacle.width / 2;

          const dx = playerCenter - obstacleCenter;

          if (Math.abs(dx) > 5) {
            obstacle.x += dx * 0.05;
          }
        }
        if (obstacle.type === "zigzag") {
          obstacle.x += Math.sin(obstacle.y * 0.05) * 7;
        }
        obstacle.y += obstacle.speed * speedMultiplier;

        if (obstacle.height === 20 && obstacle.y < canvas.height - 50) {
          wallStillExists = true;
        }
      });

      wallActive = wallStillExists;
      const laserCollision = updateLasers(
        lasers,
        player,
        invincibletime,
        hasshield,
      );
      if (laserCollision.hasCollision) {
        if (laserCollision.triggerGameover) {
          gameover = true;
          onGameEnd?.();
          if (!sessionsaved) {
            saveGameSession();
            sessionsaved = true;
          }
          gameplaymusic.pause();
          gameplaymusic.currentTime = 0;
          gameoveraud.currentTime = 0;
          gameoveraud.play().catch(() => {});

          spawnparticles(
            particles,
            laserCollision.collisionPos.x,
            laserCollision.collisionPos.y,
          );
        } else {
          hasshield = laserCollision.hasshield;
          shieldtime = 0;
          invincibletime = laserCollision.invincibletime;
          shieldbreakaud.currentTime = 0;
          shieldbreakaud.play().catch(() => {});
        }
      }
      powerups.forEach((p) => {
        p.y += p.speed;
      });

      powerups.forEach((p, index) => {
        if (isColliding(player, p)) {
          if (p.type === "slow") slowEffect = 300;
          if (p.type === "score") scoreBoost = 300;
          if (p.type === "shield") {
            hasshield = true;
            shieldtime = 300;
          }

          poweruppickupaud.currentTime = 0;
          poweruppickupaud.play().catch(() => {});
          powerups.splice(index, 1);
        }
      });
      if (hasshield) {
        shieldtime--;
        if (shieldtime <= 0) {
          hasshield = false;
          shieldtime = 0;
        }
      }
      if (score > highscore) {
        highscore = score;

        localStorage.setItem("highscore", highscore);

        if (!highscorebroken) {
          highscoretexttime = 360;
          highscorebroken = true;
        }
      }
      if (slowEffect > 0) slowEffect--;
      if (scoreBoost > 0) scoreBoost--;
      if (invincibletime > 0) invincibletime--;
      if (highscoretexttime > 0) {
        highscoretexttime--;
      }
      let hithandled = false;
      obstacles.forEach((obstacle) => {
        if (hithandled || gameover) return;
        const buffer = 10;
        if (
          obstacle.y > player.y + player.height &&
          obstacle.y < player.y + player.height + 10
        ) {
          if (
            Math.abs(
              player.x + player.width / 2 - (obstacle.x + obstacle.width / 2),
            ) <
            player.width + buffer
          ) {
            if (nearmisscooldown <= 0) {
              nearmiss += 1;
              score += 5;
              nearmisscooldown = 30;
              ntext = 30;
              combo++;
              combotime = 180;
              targetzoom = 1.03;
              zoomtimer = 10;
              nearmissaud.currentTime = 0;
              nearmissaud.play().catch(() => {});
            }
          }
        }

        if (invincibletime <= 0 && isColliding(player, obstacle)) {
          if (hasshield) {
            hasshield = false;
            shieldtime = 0;
            invincibletime = 30;
            shieldbreakaud.currentTime = 0;
            shieldbreakaud.play().catch(() => {});
            spawnparticles(
              particles,
              player.x + player.width / 2,
              player.y + player.height / 2,
            );

            if (
              obstacle.width === 20 &&
              obstacle.height === 20 &&
              !obstacle.type
            ) {
              for (let i = obstacles.length - 1; i >= 0; i--) {
                if (obstacles[i].height === 20) {
                  obstacles.splice(i, 1);
                }
              }

              wallActive = false;
            } else {
              const index = obstacles.indexOf(obstacle);

              if (index !== -1) {
                obstacles.splice(index, 1);
              }
            }
            hithandled = true;
          } else {
            gameover = true;
            onGameEnd?.();

            if (!sessionsaved) {
              saveGameSession();
              sessionsaved = true;
            }
            gameplaymusic.pause();
            gameplaymusic.currentTime = 0;
            gameoveraud.currentTime = 0;
            gameoveraud.play().catch(() => {});
            shakestrength = 10;
            shaketime = 20;
            flashtime = 10;
            targetzoom = 1.1;
            spawnparticles(
              particles,
              player.x + player.width / 2,
              player.y + player.height / 2,
            );
          }
        }
      });
      if (zoomtimer > 0) {
        zoomtimer--;
      } else {
        targetzoom = 1;
      }
      camerazoom += (targetzoom - camerazoom) * 0.1;
      scoremultiplier = 1 + Math.floor(combo / 3);
      if (ntext > 0) ntext--;
      if (nearmisscooldown > 0) nearmisscooldown--;
      const eventUpdate = updateEventTimer(eventtime);
      if (eventUpdate) {
        eventtime = eventUpdate.eventtime;
        if (eventUpdate.currentevent !== undefined) {
          currentevent = eventUpdate.currentevent;
        }
      }
      if (combotime > 0) {
        combotime--;
      } else {
        combo = 0;
      }
      for (let i = obstacles.length - 1; i >= 0; i--) {
        if (obstacles[i].y > canvas.height) {
          obstacles.splice(i, 1);
        }
      }
      const achievementUpdate = checkAchievements(
        { score, scoremultiplier, nearmiss, difficulty },
        achievements,
      );

      if (achievementUpdate.achievementtext) {
        achievementtext = achievementUpdate.achievementtext;
        achievementtime = achievementUpdate.achievementtime;
      }

      if (achievementtime > 0) {
        achievementtime--;
      }
    }
    function draw() {
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, "#1a1a2e");
      gradient.addColorStop(1, "#000000");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.save();

      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.scale(camerazoom, camerazoom);
      ctx.translate(-canvas.width / 2, -canvas.height / 2);

      if (shaketime > 0) {
        const dx = (Math.random() - 0.5) * shakestrength;
        const dy = (Math.random() - 0.5) * shakestrength;
        ctx.translate(dx, dy);
        shaketime--;
      }

      if (gamestate === "playing") {
        ctx.fillStyle = "rgba(255, 255, 255, 0.03)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      if (gamestate === "menu") {
        ctx.textAlign = "center";
        ctx.shadowColor = "white";
        ctx.shadowBlur = 10;
        ctx.fillStyle = "#ffffff";
        ctx.font = "48px Arial";
        ctx.fillText("DODGE GAME", canvas.width / 2, 150);
        ctx.shadowBlur = 0;

        ctx.font = "22px Arial";
        ctx.fillStyle = "#cccccc";
        ctx.fillText("Select Difficulty", canvas.width / 2, 200);

        ctx.fillText("Press 1 - Easy", canvas.width / 2, 250);
        ctx.fillText("Press 2 - Medium", canvas.width / 2, 290);
        ctx.fillText("Press 3 - Hard", canvas.width / 2, 330);
        ctx.fillText("Press 4 - Extreme", canvas.width / 2, 370);

        ctx.font = "18px Arial";
        ctx.fillText("Choose Player Color:", canvas.width / 2, 430);
        ctx.fillText(
          "Q-Blue  W-Green  E-Yellow  R-Purple",
          canvas.width / 2,
          480,
        );
        if (slowEffect > 0) {
          ctx.shadowColor = "cyan";
          ctx.shadowBlur = 15;
        } else if (scoreBoost > 0) {
          ctx.shadowColor = "gold";
          ctx.shadowBlur = 15;
        } else {
          ctx.shadowBlur = 0;
        }
        ctx.fillStyle = playerColor;
        ctx.fillText("Selected Color : " + playerColor, canvas.width / 2, 460);

        ctx.fillStyle = "#cccccc";
        ctx.fillText("Press ENTER to start", canvas.width / 2, 400);

        ctx.restore();
        return;
      }
      if (invincibletime <= 0 || invincibletime % 20 < 10) {
        ctx.fillStyle = playerColor;
        ctx.fillRect(player.x, player.y, player.width, player.height);
      }
      lasers.forEach((laser) => {
        if (!laser.active) {
          ctx.fillStyle = "rgba(255,0,0,0.4)";
          ctx.fillRect(laser.x, 0, laser.width, canvas.height);
        } else {
          ctx.fillStyle = "red";
          ctx.fillRect(laser.x, 0, laser.width, canvas.height);
        }
      });
      obstacles.forEach((obstacle) => {
        if (obstacle.type === "tracking") {
          ctx.fillStyle = "purple";
        } else if (obstacle.type === "zigzag") {
          ctx.fillStyle = "orange";
        } else {
          ctx.fillStyle = "red";
        }

        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
      });

      powerups.forEach((p) => {
        if (p.type === "slow") ctx.fillStyle = "cyan";
        else if (p.type === "score") ctx.fillStyle = "gold";
        else if (p.type === "shield") ctx.fillStyle = "#4da6ff";
        ctx.fillRect(p.x, p.y, p.width, p.height);
      });
      if (hasshield) {
        ctx.strokeStyle = "cyan";
        ctx.lineWidth = 3;
        ctx.strokeRect(
          player.x - 5,
          player.y - 5,
          player.width + 10,
          player.height + 10,
        );
        ctx.fillStyle = "cyan";
        ctx.fillRect(10, 150, shieldtime / 2, 5);
      }
      if (slowEffect > 0) {
        ctx.fillStyle = "cyan";
        ctx.font = "18px Arial";
        ctx.fillText("SLOW ACTIVE", 10, 60);
      }
      if (ntext > 0) {
        ctx.fillStyle = "yellow";
        ctx.font = "18px Arial";
        ctx.fillText("NEAR MISS!", canvas.width / 2, 100);
      }
      if (scoreBoost > 0) {
        ctx.fillStyle = "gold";
        ctx.fillText("2x Score", 10, 90);
      }

      if (slowEffect > 0) {
        ctx.fillStyle = "cyan";
        ctx.fillRect(10, 65, slowEffect / 3, 5);
      }

      if (scoreBoost > 0) {
        ctx.fillStyle = "gold";
        ctx.fillRect(10, 95, scoreBoost / 3, 5);
      }
      ctx.restore();

      ctx.fillStyle = "#ffffff";
      ctx.font = "20px Arial";
      ctx.fillText("Score: " + score, 10, 30);
      ctx.fillStyle = "white";
      ctx.font = "16px Arial";
      ctx.fillStyle = "#ffffff";
      ctx.font = "20px Arial";
      ctx.textAlign = "right";
      ctx.fillText("Press P to Pause", canvas.width - 15, 30);
      ctx.textAlign = "left";
      ctx.fillText(muted ? "MUTED" : "PRESS M TO MUTE", 10, canvas.height - 20);
      if (highscoretexttime > 0) {
        ctx.fillStyle = "gold";
        ctx.font = "24px Arial";
        ctx.textAlign = "center";
        ctx.fillText(
          "NEW HIGH SCORE!!",
          canvas.width / 2,
          canvas.height / 2 - 100,
        );
      }
      ctx.textAlign = "left";
      if (scoremultiplier > 1) {
        ctx.fillStyle = "orange";
        ctx.font = "20px Arial";
        ctx.fillText("Combo x" + scoremultiplier, 10, 120);

        ctx.fillStyle = "orange";
        ctx.fillRect(10, 125, combotime, 5);
      }

      if (gameover) {
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.font = "42px Arial";
        ctx.fillText("GAME OVER", canvas.width / 2, 230);

        ctx.font = "26px Arial";
        ctx.fillText("Final Score: " + score, canvas.width / 2, 280);
        ctx.fillStyle = "gold";
        ctx.fillText("High Score: " + highscore, canvas.width / 2, 320);
        ctx.fillStyle = "white";
        ctx.font = "20px Arial";
        ctx.fillText("Press R to Restart", canvas.width / 2, 360);
      }

      if (flashtime > 0) {
        ctx.fillStyle = "rgba(255,255,255,0.4)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        flashtime--;
      }

      if (paused && !gameover) {
        ctx.textAlign = "center";
        ctx.fillStyle = "#ffffff";
        ctx.font = "40px Arial";
        ctx.fillText("PAUSED", canvas.width / 2, 250);

        ctx.font = "20px Arial";
        ctx.fillText("Press P to Resume", canvas.width / 2, 290);
      }

      if (warningtime > 0) {
        ctx.fillStyle = "rgba(255, 0, 0, 0.3)";
        ctx.fillRect(0, 0, canvas.width, 10);
        warningtime--;
      }
      if (dashcooldown > 0) {
        ctx.fillStyle = "white";
        ctx.fillRect(10, 120, dashcooldown * 2, 5);
      }
      particles.forEach((p) => {
        ctx.fillStyle = "orange";
        ctx.fillRect(p.x, p.y, p.size, p.size);
      });
      if (currentevent !== "") {
        ctx.fillStyle = "orange";
        ctx.font = "32px Arial";
        ctx.textAlign = "center";

        let text = "";

        if (currentevent === "meteor") {
          text = "☄️ METEOR SHOWER ☄️";
        }

        if (currentevent === "laserhell") {
          text = "☢️ LASER HELL ☢️";
        }

        ctx.fillText(text, canvas.width / 2, 80);

        ctx.textAlign = "left";
      }
      ctx.textAlign = "left";
      if (achievementtime > 0) {
        ctx.fillStyle = "gold";
        ctx.font = "24px Arial";
        ctx.textAlign = "center";
        ctx.fillText("ACHIEVEMENT UNLOCKED", canvas.width / 2, 140);
        ctx.font = "20px Arial";
        ctx.fillText(achievementtext, canvas.width / 2, 175);
        ctx.textAlign = "left";
      }
    }

    function gameloop() {
      update();
      draw();
      requestAnimationFrame(gameloop);
    }

    gameloop();

    return () => {
      clearInterval(scoreinterval);
      clearInterval(obsinterval);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        display: "block",
        width: "100vw",
        height: "100vh",
      }}
    ></canvas>
  );
}
