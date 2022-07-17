import '../assets/App.css';
import '../assets/Colors.css';
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
import ForgetPassPage from './ForgetPassPage';
import ResetPassPage from './ResetPassPage';
import ReportPage from './ReportPage/ReportPage';
import SettingsPage from './SettingsPage/SettingsPage';
import EmailVerifyPage from './EmailVerifyPage';
import ErrorPage from './ErrorPage';
import { useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { pageColors } from '../app/darkModeColors.js'

function App() {

  const initMode = localStorage.getItem('darkMode');
  const [darkMode, setDarkMode] = useState(initMode === "true" ? true : false);

  useEffect(() => {
    
    for (let color of pageColors) {
      if (darkMode) {
        document.documentElement.style.setProperty(color.name, color.dark);
        localStorage.setItem('darkMode', "true");
      } else {
        document.documentElement.style.setProperty(color.name, color.bright);
        localStorage.setItem('darkMode', "false");
      }
      
    }
  }, [darkMode])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
      <NavBar />
      <main>
        <SideBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/planner" element={<PlannerPage darkMode={darkMode} />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/users/:id/verify/:token" element={<EmailVerifyPage/>}/>
          <Route path="/badpage" element={<ErrorPage/>}/>
          <Route path="/forgot" element={<ForgetPassPage />} />
          <Route path="/reset" element={<ResetPassPage />} />
          <Route path = "/forum/*" element={<ForumApp/>} />
          <Route path = "/report" element={<ReportPage/>} />
          <Route path = "/settings" element={<SettingsPage darkMode={darkMode} toggleDarkMode={toggleDarkMode} />} />
        </Routes>
        <ToastContainer/>
      </main>
    </div>
    </DndProvider>
    
  );
}

export default App;

