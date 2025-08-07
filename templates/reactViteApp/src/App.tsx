import { BrowserRouter } from 'react-router-dom';
import AppRoutes from '@/AppRoutes';
import { useEffect } from 'react';
import { useTheme } from '@/features/theme/hooks/useTheme';

function App() {
  const { theme } = useTheme();

  // Set Theme
  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldUseDark = theme === 'dark' ? theme : prefersDark;

    const root = document.body;
    if (shouldUseDark) {
      root.classList.remove('light');
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
  }, []);

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
