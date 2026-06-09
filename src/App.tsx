import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import ProjectPage from './pages/ProjectPage';
import { SiteHeader } from './components/layout/SiteHeader';
import { SiteFooter } from './components/layout/SiteFooter';

function App() {
  return (
    <div className="app-shell">
      <SiteHeader />

      <main className="page-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects/:slug" element={<ProjectPage />} />
        </Routes>
      </main>

      <SiteFooter />
    </div>
  );
}

export default App;
