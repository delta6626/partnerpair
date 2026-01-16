import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Signup } from "./pages/Signup";
import { Login } from "./pages/Login";
import { Verify } from "./pages/Verify";
import { Dashboard } from "./pages/Dashboard";
import { Browse } from "./pages/Browse";
import { Messages } from "./pages/Messages";
import { Forum } from "./pages/Forum";
import { Settings } from "./pages/Settings";
import { ViewUserProfile } from "./pages/ViewUserProfile";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ProfileInsights } from "./pages/ProfileInsights";
import { UserContacts } from "./pages/UserContacts";
import { NotFound } from "./pages/NotFound";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/verify" element={<Verify />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/browse" element={<Browse />}></Route>
          <Route path="/user/:id" element={<ViewUserProfile />}></Route>
          <Route path="/messages" element={<Messages />}></Route>
          <Route path="/forum" element={<Forum />}></Route>
          {/* <Route path="/blogs" element={<Blogs />}></Route> */}
          <Route path="/settings" element={<Settings />}></Route>
          <Route path="/profileInsights" element={<ProfileInsights />}></Route>
          <Route path="/contacts" element={<UserContacts />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
