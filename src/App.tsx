import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Blogs } from "./pages/Blogs";
import { Signup } from "./pages/Signup";
import { Login } from "./pages/Login";
import { Verify } from "./pages/Verify";
import { Dashboard } from "./pages/Dashboard";
import { Browse } from "./pages/Browse";
import { Messages } from "./pages/Messages";
import { Forum } from "./pages/Forum";
import { Settings } from "./pages/Settings";
import { ViewUserProfile } from "./pages/ViewUserProfile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/verify" element={<Verify />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/browse" element={<Browse />}></Route>
        <Route path="/user" element={<ViewUserProfile />}></Route>
        <Route path="/messages" element={<Messages />}></Route>
        <Route path="/forum" element={<Forum />}></Route>
        <Route path="/blogs" element={<Blogs />}></Route>
        <Route path="/settings" element={<Settings />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
