import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import AuthForm from './components/AuthForm';
import Teacher from './pages/Professor';
import Student from './pages/student';
import Staff from './pages/Staff';
import Subject from './pages/Subject'
import Class from './pages/Class';
import Affectation from './pages/Affectation';
import EventF from './pages/Emploi';
import DashF from './pages/dash';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import './index.css';

function App() {
  const location = useLocation();

  const hideNavbarRoutes = ['/']; 

  return (
    <div className="flex">
      {}
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}

      <Routes>
        <Route path="/" element={<AuthForm />} />
        <Route path="/home" element={<DashF />} />
        <Route path="/people/students" element={<Student />} />
        <Route path="/people/teachers" element={<Teacher />} />
        <Route path="/people/staff" element={<Staff />} />
        <Route path="/subjects" element={<Subject />} />
        <Route path="/classes" element={<Class />} />
        <Route path="/affectation" element={<Affectation />} />
        <Route path="/events" element={<EventF />} />

      </Routes>
      
      <ToastContainer />
    </div>
  );
}

export default function WrappedApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}
