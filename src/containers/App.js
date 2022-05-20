import '../assets/App.css';
import SideBar from '../components/SideBar.js';
import NavBar from '../components/NavBar.js';
import ForumMainPage from './ForumMainPage/ForumMainPage.js';
import ForumPostCreation from './ForumPostCreationPage/ForumPostCreation';

function App() {
  return (
    <div className="App">
      <NavBar />
      <main>
        <SideBar />
        <ForumPostCreation />
      </main>
    </div>
  );
}

export default App;
