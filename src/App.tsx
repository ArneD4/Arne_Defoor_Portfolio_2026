import { useSearchParams } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import ProjectPage from './pages/ProjectPage';
import { SiteHeader } from './components/layout/SiteHeader';
import { SiteFooter } from './components/layout/SiteFooter';

function App() {
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') || 'home';
  const slug = searchParams.get('slug');

  const renderPage = () => {
    if (page === 'about') return <About />;
    if (page === 'projects' && slug) return <ProjectPage slug={slug} />;
    return <Home />;
  };

  return (
    <div className="app-shell">
      <SiteHeader />

      <main className="page-content">
        {renderPage()}
      </main>

      {/* <SiteFooter /> */}
    </div>
  );
}

export default App;
