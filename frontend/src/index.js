import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { NotesContextProvider } from './context/NoteContext';
import { AuthContextProvider } from './context/AuthContext';
import { ThemeContextProvider } from './context/ThemeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <NotesContextProvider>
        <ThemeContextProvider>
          <App />
        </ThemeContextProvider>
      </NotesContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
