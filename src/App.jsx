import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DrinkProvider } from './context/DrinkContext';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import DrinkDetailPage from './pages/DrinkDetailPage';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <DrinkProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/drink/:drinkId" element={<DrinkDetailPage />} />
          </Routes>
        </Layout>
      </DrinkProvider>
    </BrowserRouter>
  );
}

export default App;
