import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './main.scss';

import { DashboardPage } from './pages/Dashboard/DashboardPage';
import { AssetsPage } from './pages/Assets/AssetsPage';
import { WithNavbar } from './components/WithNavbar';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/nfts" element={<WithNavbar component={AssetsPage} />} />
        <Route path="/" element={<WithNavbar component={DashboardPage} />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
