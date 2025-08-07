// material components
import '@material/web/labs/card/outlined-card.js';
import '@material/web/button/filled-button.js';

// router components
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <main className="min-h-screen flex items-center justify-center bg-surface text-on-surface px-4">
      <md-outlined-card className="p-6 max-w-md w-full shadow bg-surface-container-high text-on-surface flex flex-col items-center gap-6">
        <h1 className="text-[64px] font-extrabold text-primary">404</h1>
        <p className="text-xl font-medium">Page Not Found</p>
        <p className="text-on-surface-variant text-center">
          Sorry, the page you’re looking for doesn’t exist or has been moved.
        </p>
        <Link to="/">
          <md-filled-button>Go To Home</md-filled-button>
        </Link>
      </md-outlined-card>
    </main>
  );
};

export default NotFoundPage;
