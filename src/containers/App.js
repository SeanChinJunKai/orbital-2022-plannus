import '../assets/App.css';
import SideBar from '../components/SideBar.js';
import NavBar from '../components/NavBar.js';
// import ForumPostCreation from './ForumPostCreationPage/ForumPostCreation';
// import ForumPostPage from './ForumPostPage/ForumPostPage';
// import LoginPage from './LoginPage';
// import ForumMainPage from './ForumMainPage/ForumMainPage';
import PlannerPage from './PlannerPage/PlannerPage';

function App() {
  return (
    <div className="App">
      <NavBar />
      <main>
        <SideBar />
        <PlannerPage />
      </main>
    </div>
  );
}

export default App;