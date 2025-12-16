import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import CrowdEntries from './components/CrowdEntries';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/crowd-entries" element={<CrowdEntries />} />
            </Routes>
        </Router>
    );
}

export default App;
