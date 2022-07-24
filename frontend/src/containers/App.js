import '../assets/App.css';
import '../assets/Colors.css';
import SideBar from '../components/SideBar.js';
import NavBar from '../components/NavBar.js';
import LoginPage from './LoginPage';
import PlannerPage from './PlannerPage/PlannerPage';
import RegisterPage from './RegisterPage';
import {Route, Routes, useNavigate } from 'react-router-dom';
import Home from './Home/Home';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import ForumApp from './ForumApp';
import ForgetPassPage from './ForgetPassPage';
import ResetPassPage from './ResetPassPage';
import ReportPage from './ReportPage/ReportPage';
import SettingsPage from './SettingsPage/SettingsPage';
import EmailVerifyPage from './EmailVerifyPage';
import ErrorPage from './ErrorPage';
import AccessBlockedPage from './AccessBlockedPage';
import { useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { pageColors } from '../app/darkModeColors.js'
import { useDispatch, useSelector } from 'react-redux';
import { checkGraduation, getReq, getModules, reset } from "../features/modules/moduleSlice"
import {logout} from "../features/auth/authSlice";

function App() {

  
  
  const {user} = useSelector(state => state.auth)
  const initMode = localStorage.getItem('darkMode');
  const [darkMode, setDarkMode] = useState(initMode === "true" ? true : false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const clearAppData = () => {
    console.log("reset")
    dispatch(logout(user));
    localStorage.removeItem('user')
    localStorage.removeItem('planner')
    localStorage.removeItem('eligible')
    localStorage.removeItem('darkMode')
    navigate('/')
  }

  useEffect(() => {
    const PLANNUS_CURR_VERSION = "v1.4";
    if (localStorage.getItem("PLANNUS_CURR_VERSION") !== PLANNUS_CURR_VERSION) {
      clearAppData();
      localStorage.setItem("PLANNUS_CURR_VERSION", PLANNUS_CURR_VERSION)
    }
  }, [])

  useEffect(() => {
    dispatch(getReq()).then(() => dispatch(getModules())).then(() => dispatch(checkGraduation())).then(() => dispatch(reset()));
  }, [])

  useEffect(() => {

    if (user) {
      if (user.banned) {
        clearAppData();
        toast.error('Your account has been banned, please contact the site administrator for more information')
      }
    }
    
    for (let color of pageColors) {
      if (darkMode) {
        document.documentElement.style.setProperty(color.name, color.dark);
        localStorage.setItem('darkMode', "true");
      } else {
        document.documentElement.style.setProperty(color.name, color.bright);
        localStorage.setItem('darkMode', "false");
      }
      
    }
  }, [darkMode, navigate, user])

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
          <Route path="/blocked" element={<AccessBlockedPage/>}/>
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

