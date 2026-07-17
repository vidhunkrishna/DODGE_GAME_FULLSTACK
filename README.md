# 🎮 Dodge Game

A modern 2D survival game built with **React**, **HTML5 Canvas**, and **Spring Boot** where players dodge incoming obstacles, lasers, and special events while collecting power-ups and competing for the highest score.

---

## 🚀 Features

### 🎯 Gameplay
- Four difficulty levels
  - Easy
  - Medium
  - Hard
  - Extreme
- Smooth player movement
- Dash mechanic
- Pause and Resume
- Mute/Unmute audio
- Dynamic difficulty progression

---

## ⚡ Special Obstacles

- Standard falling obstacles
- Tracking enemies
- Zigzag enemies
- Wall patterns with safe gaps
- Laser attacks
- Random special events
  - ☄️ Meteor Shower
  - ☢️ Laser Hell

---

## 🛡️ Power-ups

- 🛡️ Shield
- ❄️ Slow Motion
- ⭐ 2x Score Boost

---

## 🏆 Achievement System

Unlock achievements by completing various in-game challenges such as:

- High score milestones
- Near misses
- Combo streaks
- Difficulty-based challenges

Achievements are displayed on the player's profile page.

---

## 📊 Statistics

Each completed game session stores:

- Score
- Survival Time
- Difficulty
- Death Count

High scores are stored locally for quick access.

---

## 👤 Authentication

- JWT Authentication
- Google Sign-In (Firebase)
- Secure Protected Routes

---

## 🌐 Backend Features

- Spring Boot REST APIs
- PostgreSQL Database
- JWT Security
- Game Session Storage
- Leaderboard APIs
- Player Profile APIs

---

## 🏅 Leaderboard

Compete with other players by comparing:

- Highest Score
- Survival Time
- Difficulty

---

## 🎨 User Interface

- Modern dark-themed UI
- Responsive design
- Animated navigation
- Smooth gameplay effects
- Particle animations
- Camera zoom effects
- Screen shake
- Achievement notifications

## 🎮 Controls

### 🎯 Movement
- ⬅️ ➡️ ⬆️ ⬇️ **Arrow Keys** — Move the player
- ⚡ **Shift** — Dash

### 🎮 Gameplay
- ▶️ **Enter** — Start Game
- ⏸️ **P** — Pause / Resume
- 🔄 **R** — Restart (after Game Over)

### 🎨 Customization
- 🎨 **Q / W / E / R** — Change Player Color

### 🎚️ Difficulty Selection
- **1** — Easy
- **2** — Medium
- **3** — Hard
- **4** — Extreme

### 🔊 Audio
- 🔇 **M** — Mute / Unmute

## 🛠️ Tech Stack

### Frontend
- React
- HTML5 Canvas
- React Router
- Axios
- Tailwind CSS

### Backend
- Spring Boot
- Spring Security
- JWT Authentication
- PostgreSQL
- JPA / Hibernate

### Authentication
- Firebase Authentication
- Google OAuth

---

## ⚙️ Installation

### Prerequisites

- Node.js (v18 or later)
- Java 17+
- Maven
- PostgreSQL
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/dodge-game.git
cd dodge-game
```

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will start on:

```
http://localhost:5173
```

### 3. Backend Setup

```bash
cd backend
mvn spring-boot:run
```

Make sure PostgreSQL is running and update your database credentials inside:

```
application.properties
```

### 4. Firebase Configuration

Create a Firebase project and enable **Google Authentication**.

Add your Firebase configuration to the frontend before running the application.

---

## 🎮 How to Play

1. Register or Sign in using Email/Password or Google.
2. Choose your preferred difficulty.
3. Select your player color.
4. Press **Enter** to start the game.
5. Dodge incoming obstacles and lasers.
6. Collect power-ups to survive longer.
7. Perform near misses to increase your combo multiplier.
8. Beat your high score and climb the leaderboard.
9. Unlock achievements by completing various in-game challenges.
10. View your game statistics and achievements from your profile page.



## 📂 Project Structure

```
Frontend
├── Components
├── Pages
├── Systems
├── Utils

Backend
├── Controllers
├── Services
├── Repositories
├── Entities
├── Security
└── DTOs
```

---

## 👨‍💻 Author

**Vidhun Krishna S**
