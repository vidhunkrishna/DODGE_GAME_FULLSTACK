export function checkEventStart(
  gamestate,
  gameover,
  now,
  lasteventtime,
  eventtime,
) {
  if (
    gamestate === "playing" &&
    !gameover &&
    now - lasteventtime > 30000 &&
    eventtime <= 0
  ) {
    const events = ["meteor", "laserhell"];
    const currentevent = events[Math.floor(Math.random() * events.length)];
    return { currentevent, eventtime: 480, lasteventtime: now };
  }
  return null;
}

export function updateEventTimer(eventtime) {
  if (eventtime > 0) {
    eventtime--;
    return { eventtime, currentevent: eventtime <= 0 ? "" : undefined };
  }
  return null;
}

export function getSpawnChances(difficulty, currentevent) {
  let spawnChance = {
    easy: 0.35,
    mid: 0.55,
    hard: 0.75,
    extreme: 1,
  };

  if (currentevent === "meteor") {
    spawnChance.easy = 0.8;
    spawnChance.mid = 1;
    spawnChance.hard = 1;
    spawnChance.extreme = 1;
  }

  const laserHellChance = {
    easy: 0.25,
    mid: 0.35,
    hard: 0.45,
    extreme: 0.6,
  };

  return { spawnChance, laserHellChance };
}
