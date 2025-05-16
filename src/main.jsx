import { CssBaseline } from '@mui/material';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import App from './App.jsx';
import store from './redux/store.js';

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <Provider store={store}>
      <HelmetProvider>
        <CssBaseline />
        <div onContextMenu={(e) => e.preventDefault()}>
          <App />
        </div>
      </HelmetProvider>

    </Provider>

  </StrictMode>
);
