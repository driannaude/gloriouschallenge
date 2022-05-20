import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { HomePage } from './pages/home/HomePage';
import { NftsPage } from './pages/nfts/NftsPage';
import './main.scss';
import { WithNavbar } from './components/WithNavbar';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/nfts" element={<WithNavbar component={NftsPage} />} />
        <Route path="/" element={<WithNavbar component={HomePage} />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
