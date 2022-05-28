import '../assets/App.css';
import SideBar from '../components/SideBar.js';
import NavBar from '../components/NavBar.js';
import ForumPostCreation from './ForumPostCreationPage/ForumPostCreation';
import ForumPostPage from './ForumPostPage/ForumPostPage';
import LoginPage from './LoginPage';
import ForumMainPage from './ForumMainPage/ForumMainPage';
import PlannerPage from './PlannerPage/PlannerPage';
import RegisterPage from './RegisterPage';
import { Route, Routes } from 'react-router-dom';
import Home from './Home/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'


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
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
        <ToastContainer/>
      </main>
    </div>
  );
}

export default App;