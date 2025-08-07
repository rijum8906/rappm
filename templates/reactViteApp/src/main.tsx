import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';

import '@/assets/css/light.css';
import '@/assets/css/dark.css';

/* CLI_INJECT_IMPORTS */

// create new TanStack query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <PersistGate loading={null} persistor={persistor}>
      <Provider store={store}>
        <App />
      </Provider>
    </PersistGate>
  </QueryClientProvider>
);
