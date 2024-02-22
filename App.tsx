import React from 'react';
import ToastProvider from './src/components/toast';
import Routes from './src/router/routes';
import './src/styles/globals.css';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {AuthContextProvider} from './src/context/auth.context';
import {decode, encode} from 'base-64';

const global = globalThis as any;

if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}

const queryClient = new QueryClient();

function App() {
  return (
    <ToastProvider>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <Routes />
        </AuthContextProvider>
      </QueryClientProvider>
    </ToastProvider>
  );
}

export default App;
