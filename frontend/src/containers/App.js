import '../assets/App.css';
import SideBar from '../components/SideBar.js';
import NavBar from '../components/NavBar.js';
import LoginPage from './LoginPage';
import PlannerPage from './PlannerPage/PlannerPage';
import RegisterPage from './RegisterPage';
import { Route, Routes } from 'react-router-dom';
import Home from './Home/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import ForumApp from './ForumApp';

function App() {
  return (
    <div className="App">
      <NavBar />
      <main>
        <SideBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/planner" element={<PlannerPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path = "/forum/*" element={<ForumApp/>} />
        </Routes>
        <ToastContainer/>
      </main>
    </div>
  );
}

export default App;

