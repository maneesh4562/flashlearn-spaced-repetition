import './index.css';
import Navbar from './components/Navbar';
import AppRoutes from './routes/AppRoutes';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-zinc-50 dark:bg-zinc-900">
      <Navbar />
      <main className="flex-1 pt-20 pb-24 md:ml-64 md:pt-8 md:pb-8">
        <AppRoutes />
      </main>
    </div>
  );
}
