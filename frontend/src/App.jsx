

// frontend/src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import KelimePratikSayfasi from './pages/KelimePratikSayfasi';
import ArticlePage from './pages/ArticlePage'

function App() {
  return (
    <Router>
      <Routes>
        {/* Ana Layout rotası */}
        <Route path="/" element={<Layout />}>
          {/* Bu rotalar, Layout içindeki <Outlet />'e yerleşecek */}
          <Route index element={<HomePage />} />
          <Route path="pratik/:id" element={<KelimePratikSayfasi />} />
          <Route path="article/:id" element={<ArticlePage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

/*
function App() {
  // HomePage'i saran fazladan bir div veya className OLMADIĞINDAN emin ol.
  // Ya da varsa, onun stilini kontrol et.
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pratik/:id" element={<KelimePratikSayfasi />} />
        <Route path="/article/:id" element={<ArticlePage />} />
      </Routes>
    </Router>
  );
}

export default App;

*/

