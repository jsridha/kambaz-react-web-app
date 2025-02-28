import './App.css'
import Kambaz from './Kambaz';
import Labs from './Labs';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Navigate to="Kambaz" />} />
        <Route path="/Labs/*" element={<Labs />} />
        <Route path="/Kambaz/*" element={<Kambaz />} />
      </Routes>
    </HashRouter>
);}

