import './App.css';
import LandingPage from './pages/LandingPage';
import { selectActivePath } from './redux/routeSlice';
import { useSelector } from 'react-redux';
import Dashboard from './pages/Dashboard';

if (window === window.top) {
  window.location.href = 'http://localhost:8000/?runAppFromUrl=http://localhost:3000';
}

function App() {
  const activePath = useSelector(selectActivePath);

  switch (activePath) {
    case 'dashboard':
      return <Dashboard />;
    case 'landing':
    default:
      return <LandingPage />;
  }
}

export default App;
