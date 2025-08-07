import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import Loader from '@/shared/ui/Loader';

const MainLayout = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Outlet />
    </Suspense>
  );
};

export default MainLayout;
