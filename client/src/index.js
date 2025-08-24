import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import './index.css';

import { AuthProvider } from './context/AuthContext';
import PageTransition from './context/PageTransition'; // ✅ import your transition wrapper

import HomePage from './pages/home/HomePage';
import GalleryPage from './pages/gallery/GalleryPage';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Login from './pages/login/Login';
import DescPage from './pages/description/DescPage';
import NotFound from './components/NotFound/NotFound';

import { HelmetProvider, Helmet } from '@dr.pogodin/react-helmet'; // ✅ import HelmetProvider

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><HomePage/></PageTransition>} />
        <Route path="/home" element={<PageTransition><HomePage/></PageTransition>} />
        <Route path="/gallery" element={<PageTransition><GalleryPage/></PageTransition>} />
        <Route path="/login" element={<PageTransition><Login/></PageTransition>} />
        <Route path="/about" element={<PageTransition><DescPage/></PageTransition>} />
        <Route path="/*" element={<PageTransition><NotFound/></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <HelmetProvider> {/* ✅ wrap whole app with HelmetProvider */}
        <Helmet>
          <link rel='icon' type="image/png" href="/favicon.png"  />
        </Helmet>
        <BrowserRouter>
          <Navbar/>
          <AnimatedRoutes />   
          <Footer/>
        </BrowserRouter>
      </HelmetProvider>
    </AuthProvider>
  </React.StrictMode>
);
