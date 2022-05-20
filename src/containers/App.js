import '../assets/App.css';
import SideBar from '../components/SideBar.js';
import NavBar from '../components/NavBar.js';
import ForumMainPage from './ForumMainPage/ForumMainPage.js';

function App() {
  return (
    <div className="App">
      <NavBar />
      <main>
        <SideBar />
        <ForumMainPage />
      </main>
    </div>
  );
}

export default App;
