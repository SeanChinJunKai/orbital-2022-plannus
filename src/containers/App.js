import '../assets/App.css';
import SideBar from '../components/SideBar.js';
import NavBar from '../components/NavBar.js';
import ForumApp from '../components/ForumApp.js';

function App() {
  return (
    <div className="App">
      <NavBar />
      <main>
        <SideBar />
        <ForumApp />
      </main>
    </div>
  );
}

export default App;
