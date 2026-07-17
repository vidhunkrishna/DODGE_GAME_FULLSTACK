import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginScreen from "./pages/Loginpage";
import Gamepage from "./pages/Gamepage";
import { Signuppage } from "./pages/Signuppage";
import ProtectedRoutes from "./components/ProtectedRoutes";
import LeaderboardPage from "./pages/Leaderboard";
import Profilepage from "./pages/Profilepage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/signup" element={<Signuppage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="/profile" element={<Profilepage/>}/>
        <Route
          path="/game"
          element={
            <ProtectedRoutes>
              <Gamepage />
            </ProtectedRoutes>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
