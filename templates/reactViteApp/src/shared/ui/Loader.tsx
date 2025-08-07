import '@material/web/progress/circular-progress.js';

const Loader = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface text-on-surface">
      <md-circular-progress indeterminate className="w-12 h-12 text-primary"></md-circular-progress>
    </div>
  );
};

export default Loader;
