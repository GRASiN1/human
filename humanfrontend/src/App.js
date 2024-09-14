import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/homepage/homepage";
import Authenticate from "./components/authenticate/authenticate";
import ProfilePage from "./components/profilepage/profilepage";
import Tracker from "./components/tracker/tracker";
// eslint-disable-next-line
let user = {
  name: "Abhinav",
  profileImage: 'https://preview.redd.it/high-quality-transparent-versions-of-the-default-avatars-v0-nmbxnhh4nica1.png?width=256&format=png&auto=webp&s=7ba3475861fde9307ca1ff7c7e01c38db3ef8862',
}

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage user={null}/>} />
          <Route path="/authenticate" element={<Authenticate />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/tracker/:title"  element={<Tracker />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
