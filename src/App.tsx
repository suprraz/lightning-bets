import './App.css';
import Profile from './pages/Profile/Profile';
import { selectActivePath } from './redux/routeSlice';
import { useSelector } from 'react-redux';
import Dashboard from './pages/Dashboard/Dashboard';

if (window === window.top) {
  window.location.href = 'http://localhost:8000/?runAppFromUrl=http://localhost:3000';
}

function App() {
  const activePath = useSelector(selectActivePath);

  switch (activePath) {
    case 'dashboard':
      return <Dashboard />;
    case 'landing':
    case 'updateScreenName':
    default:
      return <Profile />;
  }
}

export default App;
