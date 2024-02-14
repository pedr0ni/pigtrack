import React from 'react';
import HomeScreen from './screens/home';
import ToastProvider from './components/toast';

function App() {
  return (
    <ToastProvider>
      <HomeScreen />
    </ToastProvider>
  );
}

export default App;
