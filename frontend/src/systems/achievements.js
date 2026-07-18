export function unlockachievement(achievements, name) {
  if (!achievements.includes(name)) {
    achievements.push(name);
    return name;
  }
  return null;
}

export function checkAchievements(
  { score, scoremultiplier, nearmiss, difficulty },
  achievements,
) {
  let achievementtext = null;
  let achievementtime = 0;

  if (score >= 100) {
    const unlocked = unlockachievement(achievements, "🏆 Survivor");
    if (unlocked) {
      achievementtext = unlocked;
      achievementtime = 180;
    }
  }

  if (scoremultiplier >= 5) {
    const unlocked = unlockachievement(achievements, "⚡ Combo Master");
    if (unlocked) {
      achievementtext = unlocked;
      achievementtime = 180;
    }
  }

  if (nearmiss >= 20) {
    const unlocked = unlockachievement(achievements, "😈 Daredevil");
    if (unlocked) {
      achievementtext = unlocked;
      achievementtime = 180;
    }
  }

  if (difficulty === "extreme" && score >= 100) {
    const unlocked = unlockachievement(achievements, "🔥 Extreme Survivor");
    if (unlocked) {
      achievementtext = unlocked;
      achievementtime = 180;
    }
  }

  return { achievementtext, achievementtime };
}
