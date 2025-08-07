import '@material/web/labs/card/outlined-card.js';
import '@material/web/icon/icon.js';

const features = [
  {
    icon: "build",
    title: "Easy Scaffolding",
    desc: "Create fully structured React apps with one command.",
  },
  {
    icon: "cloud_upload",
    title: "Deploy with Ease",
    desc: "Built-in deploy command for Vercel, Netlify, and more.",
  },
  {
    icon: "storage",
    title: "Redux Persist",
    desc: "State management with auto persistence built-in.",
  },
  {
    icon: "data_object",
    title: "TanStack Query",
    desc: "Powerful data fetching and caching made simple.",
  },
  {
    icon: "layers",
    title: "Professional Structure",
    desc: "Opinionated folder structure ready for scaling.",
  },
];

const HomePage = () => {
  return (
    <main className="min-h-screen px-4 py-8 bg- text-on-surface">
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-2">Welcome to <span className="text-primary">rappm</span></h1>
        <p className="text-on-surface-variant text-lg">
          The CLI tool to build, scale & deploy modern apps effortlessly.
        </p>
      </section>

      <section className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {features.map((feat) => (
          <md-outlined-card key={feat.title} className="outlined-xl p-4 shadow-sm bg-white">
            <div className="flex items-center gap-4">
              <md-icon>{feat.icon}</md-icon>
              <div>
                <h2 className="text-xl font-semibold">{feat.title}</h2>
                <p className="text-sm text-on-surface-variant">{feat.desc}</p>
              </div>
            </div>
          </md-outlined-card>
        ))}
      </section>
    </main>
  );
};

export default HomePage;