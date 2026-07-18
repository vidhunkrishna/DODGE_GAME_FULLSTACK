import gameOverSoundFile from "../assets/freesound_community-game-over-arcade-6435.mp3";
import dash_sound from "../assets/dash_sound.mp3";
import nearmiss_sound from "../assets/nearmiss_sound.mp3";
import shieldbreak_sound from "../assets/shieldbreak_sound.mp3";
import powerup_sound from "../assets/powerup_sound.mp3";
import laserloading_sound from "../assets/beep.mp3";
import laserhit_sound from "../assets/laserhit_sound.mp3";
import gameplay_background from "../assets/gameplay-background_3.mp3";
import menu_sound from "../assets/menu_sound.mp3";

export const gameoveraud = new Audio(gameOverSoundFile);
export const dashaud = new Audio(dash_sound);
export const nearmissaud = new Audio(nearmiss_sound);
export const shieldbreakaud = new Audio(shieldbreak_sound);
export const poweruppickupaud = new Audio(powerup_sound);
export const laserloadingaud = new Audio(laserloading_sound);
export const laserhitaud = new Audio(laserhit_sound);
export const gameplaymusic = new Audio(gameplay_background);
gameplaymusic.loop = true;
gameplaymusic.volume = 0.2;
export const menuaud = new Audio(menu_sound);
menuaud.loop = true;
menuaud.volume = 0.25;

export function setAudioMuted(muted) {
  const volume = muted ? 0 : 1;

  gameoveraud.volume = volume;
  dashaud.volume = volume;
  nearmissaud.volume = volume;
  shieldbreakaud.volume = volume;
  poweruppickupaud.volume = volume;
  laserloadingaud.volume = volume;
  laserhitaud.volume = volume;
  gameplaymusic.volume = muted ? 0 : 0.2;
  menuaud.volume = muted ? 0 : 0.25;
}
