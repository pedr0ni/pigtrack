import React from 'react';
import ToastProvider from './src/components/toast';
import Routes from './src/router/routes';
import './src/styles/globals.css';

function App() {
  return (
    <ToastProvider>
      <Routes />
    </ToastProvider>
  );
}

export default App;
