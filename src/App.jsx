import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Conferences from "./pages/Conferences";
import ConferenceForm from "./pages/ConferenceForm";
import RequireAuth from "./components/RequireAuth";
import AdminLogin from "./pages/AdminLogin";
import Navbar from "./components/Navbar";
import "./styles.css";

function App() {
  return (
    <Router>
      <Navbar />
      <main className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/conferences" element={<Conferences />} />
          <Route
            path="/conferences/new"
            element={
              <RequireAuth>
                <ConferenceForm />
              </RequireAuth>
            }
          />
          <Route
            path="/conferences/:id/edit"
            element={
              <RequireAuth>
                <ConferenceForm />
              </RequireAuth>
            }
          />
        </Routes>
      </main>
    </Router>
  );
}

export default App;