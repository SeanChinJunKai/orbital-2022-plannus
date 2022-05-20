import '../assets/App.css';
import SideBar from '../components/SideBar.js';
import NavBar from '../components/NavBar.js';
import ForumApp from '../components/ForumApp.js';
import LoginPage from './LoginPage';

function App() {
  return (
    <div className="App">
      <NavBar />
      <main>
        <SideBar />
        <LoginPage />
      </main>
    </div>
  );
}

export default App;