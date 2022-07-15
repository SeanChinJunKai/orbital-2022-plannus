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
import ForgetPassPage from './ForgetPassPage';
import ResetPassPage from './ResetPassPage';
import ReportPage from './ReportPage/ReportPage';
import SettingsPage from './SettingsPage/SettingsPage';
import EmailVerifyPage from './EmailVerifyPage';
import ErrorPage from './ErrorPage';
import { useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const rootVariables = [
      {
        name: '--color-primary',
        bright: '#0A2463',
        dark: '#202020',
      },
      {
        name:  '--color-secondary',
        bright: '#78aff0',
        dark: '#000000',
      },
      {
        name: '--color-tertiary',
        bright: '#f8f7ff',
        dark: '#181818',
      },
      {
        name: '--color-four',
        bright: '#9c0e94',
        dark: '#9c0e94'
      },
      {
        name: '--color-text-primary',
        bright: '#f0f0f0',
        dark: '#000000',
      },
      {
        name: '--color-text-secondary',
        bright: '#d5d9eb',
        dark: '#383838',
      },
      {
        name: '--color-text-tertiary',
        bright: '#E2E2E2',
        dark: '#E2E2E2',
      },
      {
        name: '--color-text-standard',
        bright: '#000000',
        dark: '#ffffff'
      }
    ];
    for (let variable of rootVariables) {
      if (darkMode) {
        document.documentElement.style.setProperty(variable.name, variable.dark);
      } else {
        document.documentElement.style.setProperty(variable.name, variable.bright);
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
          <Route path="/planner" element={<PlannerPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/users/:id/verify/:token" element={<EmailVerifyPage/>}/>
          <Route path="/badpage" element={<ErrorPage/>}/>
          <Route path="/forgot" element={<ForgetPassPage />} />
          <Route path="/reset" element={<ResetPassPage />} />
          <Route path = "/forum/*" element={<ForumApp/>} />
          <Route path = "/report" element={<ReportPage/>} />
          <Route path = "/settings" element={<SettingsPage toggleDarkMode={toggleDarkMode} />} />
        </Routes>
        <ToastContainer/>
      </main>
    </div>
    </DndProvider>
    
  );
}

export default App;

