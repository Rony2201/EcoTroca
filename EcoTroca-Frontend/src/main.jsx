import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthProvider from './context/authHandler.jsx';
import PropostaProvider from './context/PropostaContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <PropostaProvider>
          <App />
        </PropostaProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);