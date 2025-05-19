import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutGrid as Cards,
  Repeat,
  BarChart2,
  Settings as SettingsIcon 
} from 'lucide-react';
import { motion } from 'framer-motion';
import StreakCounter from './StreakCounter';

const navItems = [
  { to: '/decks', label: 'Decks', icon: <Cards size={20} /> },
  { to: '/review', label: 'Review', icon: <Repeat size={20} /> },
  { to: '/stats', label: 'Stats', icon: <BarChart2 size={20} /> },
  { to: '/settings', label: 'Settings', icon: <SettingsIcon size={20} /> },
];

export default function Navbar() {
  const { pathname } = useLocation();
  
  return (
    <motion.nav
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-lg border-t border-zinc-200 dark:border-zinc-800 flex justify-around items-center h-16 z-50 shadow-lg md:static md:h-screen md:w-64 md:flex-col md:justify-start md:items-stretch md:border-t-0 md:border-r md:shadow-none"
    >
      <div className="hidden md:flex items-center gap-3 px-6 py-8 border-b border-zinc-200 dark:border-zinc-800">
        <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center shadow-md">
          <Cards className="text-white" size={24} />
        </div>
        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
          FlashCards
        </h1>
      </div>
      
      <div className="flex md:flex-col w-full md:px-4 md:py-6">
        {navItems.map((item) => {
          const isActive = pathname === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`relative flex flex-col md:flex-row items-center gap-1 px-4 py-2 text-xs font-medium transition-all duration-200 md:justify-start md:gap-3 md:text-base md:px-4 md:py-3 md:rounded-lg ${
                isActive
                  ? 'text-blue-600 dark:text-blue-400 md:bg-blue-50 dark:md:bg-blue-900/20'
                  : 'text-zinc-500 dark:text-zinc-400 hover:text-blue-500 dark:hover:text-blue-300 md:hover:bg-zinc-100 dark:md:hover:bg-zinc-800'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute left-0 w-1 h-8 bg-blue-600 rounded-r-full md:w-full md:h-full md:rounded-lg md:bg-blue-100 dark:md:bg-blue-900/20"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">{item.icon}</span>
              <span className="relative z-10 hidden md:inline">{item.label}</span>
            </Link>
          );
        })}
      </div>

      <div className="hidden md:block mt-auto p-4">
        <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl shadow-inner">
          <StreakCounter />
        </div>
      </div>
    </motion.nav>
  );
} 