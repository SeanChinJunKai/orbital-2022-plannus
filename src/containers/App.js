import '../assets/App.css';
import SideBar from '../components/SideBar.js';
import NavBar from '../components/NavBar.js';
import ForumPostCreation from './ForumPostCreationPage/ForumPostCreation';
import ForumPostPage from './ForumPostPage/ForumPostPage';
import LoginPage from './LoginPage';
import ForumMainPage from './ForumMainPage/ForumMainPage';
import PlannerPage from './PlannerPage/PlannerPage';
import { Route, Routes } from 'react-router-dom';
import Home from './Home/Home';


function App() {
  return (
    <div className="App">
      <NavBar />
      <main>
        <SideBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/planner" element={<PlannerPage />} />
          <Route path="/forum" element={<ForumMainPage />} />
          <Route path="/forum/create" element={<ForumPostCreation />} />
          <Route path="/forum/post" element={<ForumPostPage/>} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;