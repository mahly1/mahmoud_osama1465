import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Industries from './pages/Industries'; // We kept the file but logic moves to Brands in other places
import Contact from './pages/Contact';
import ServiceDetail from './pages/ServiceDetail';
import BrandProjects from './pages/BrandProjects';
import ProjectDetail from './pages/ProjectDetail';
import Admin from './pages/Admin';
import { DataProvider } from './context';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

const App: React.FC = () => {
  return (
    <DataProvider>
      <Router>
        <ScrollToTop />
        <Routes>
            {/* Admin Route - No Layout Wrapper (Has its own layout) */}
            <Route path="/admin" element={<Admin />} />
            
            {/* Public Routes - Wrapped in Layout */}
            <Route path="*" element={
                <Layout>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/services" element={<Services />} />
                        <Route path="/industries" element={<Industries />} />
                        <Route path="/contact" element={<Contact />} />
                        
                        {/* Flow: Service -> Brand List -> Projects List -> Project Detail */}
                        <Route path="/service/:id" element={<ServiceDetail />} />
                        <Route path="/service/:serviceId/brand/:brandId" element={<BrandProjects />} />
                        <Route path="/project/:id" element={<ProjectDetail />} />
                    </Routes>
                </Layout>
            } />
        </Routes>
      </Router>
    </DataProvider>
  );
};

export default App;