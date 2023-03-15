import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { AppContextProvider } from "./components/app-context";
import ChartPage from "./pages/ChartPage";
import { AuthContextProvider } from "./components/Auth-context";
import { Signup } from "./pages/Signup";

function App() {
  return (
    <AuthContextProvider>
    <AppContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/chart" element={<ChartPage/>}/>
        </Routes>
      </Router>
    </AppContextProvider>
    </AuthContextProvider>
  );
}

export default App;
