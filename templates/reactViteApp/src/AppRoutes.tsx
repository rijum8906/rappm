import { lazy, Suspense } from 'react';
import { useRoutes } from 'react-router-dom';

// Loader
import Loader from '@/shared/ui/Loader';

// --- Layouts ---
import MainLayout from '@/layouts/MainLayout';

// --- Lazy loaded pages ---
const HomePage = lazy(() => import('@/pages/HomePage'));
const NotFoundPage = lazy(() => import('@/pages/NotFound'));

function AppRoutes() {
  const routes = useRoutes([
    {
      path: '/',
      element: <MainLayout />,
      children: [{ index: true, element: <HomePage /> }],
    },
    {
      path: '*',
      element: <NotFoundPage />,
    },
  ]);

  return <Suspense fallback={<Loader />}>{routes}</Suspense>;
}

export default AppRoutes;
