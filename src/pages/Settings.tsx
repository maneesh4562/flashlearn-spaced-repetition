import { useState, useEffect } from 'react';
import Container from '../components/Container';
import { Moon, Sun, Trash2, Download, Upload } from 'lucide-react';
import Button from '../components/Button';
import { useFlashcardStore } from '../stores/flashcards';
import Toast from '../components/Toast';

export default function Settings() {
  const { decks } = useFlashcardStore();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [dailyGoal, setDailyGoal] = useState(20);
  const [reminderTime, setReminderTime] = useState('09:00');
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState({ title: '', description: '' });
  const [isImporting, setIsImporting] = useState(false);

  useEffect(() => {
    // Load settings from localStorage
    const savedSettings = localStorage.getItem('settings');
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      setIsDarkMode(settings.isDarkMode || false);
      setDailyGoal(settings.dailyGoal || 20);
      setReminderTime(settings.reminderTime || '09:00');
    }
  }, []);

  useEffect(() => {
    // Save settings to localStorage
    const settings = {
      isDarkMode,
      dailyGoal,
      reminderTime
    };
    localStorage.setItem('settings', JSON.stringify(settings));
  }, [isDarkMode, dailyGoal, reminderTime]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const exportData = () => {
    try {
      const data = {
        decks,
        settings: {
          isDarkMode,
          dailyGoal,
          reminderTime
        },
        streak: localStorage.getItem('streak')
      };
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `flashcards-backup-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
      showToast('Success', 'Data exported successfully');
    } catch  {
      showToast('Error', 'Failed to export data');
    }
  };

  const importData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (file.type !== 'application/json') {
      showToast('Error', 'Please select a valid JSON file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      showToast('Error', 'File size should be less than 5MB');
      return;
    }

    setIsImporting(true);
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        
        // Validate data structure
        if (!data || typeof data !== 'object') {
          throw new Error('Invalid data format');
        }

        // Import decks with validation
        if (data.decks) {
          if (!Array.isArray(data.decks)) {
            throw new Error('Invalid decks format');
          }
          localStorage.setItem('flashcards', JSON.stringify(data.decks));
        }
        
        // Import settings with validation
        if (data.settings) {
          if (typeof data.settings !== 'object') {
            throw new Error('Invalid settings format');
          }
          setIsDarkMode(data.settings.isDarkMode || false);
          setDailyGoal(data.settings.dailyGoal || 20);
          setReminderTime(data.settings.reminderTime || '09:00');
        }
        
        // Import streak with validation
        if (data.streak) {
          if (typeof data.streak !== 'string') {
            throw new Error('Invalid streak format');
          }
          localStorage.setItem('streak', data.streak);
        }
        
        showToast('Success', 'Data imported successfully');
        window.location.reload();
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Invalid backup file';
        showToast('Error', errorMessage);
      } finally {
        setIsImporting(false);
        // Reset file input
        event.target.value = '';
      }
    };

    reader.onerror = () => {
      showToast('Error', 'Failed to read file');
      setIsImporting(false);
      event.target.value = '';
    };

    reader.readAsText(file);
  };

  const resetData = () => {
    if (window.confirm('Are you sure you want to reset all data? This cannot be undone.')) {
      localStorage.clear();
      setIsDarkMode(false);
      setDailyGoal(20);
      setReminderTime('09:00');
      showToast('Success', 'All data has been reset');
      window.location.reload();
    }
  };

  const showToast = (title: string, description: string) => {
    setToastMessage({ title, description });
    setToastOpen(true);
  };

  return (
    <Container>
      <div className="max-w-2xl mx-auto space-y-8">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Settings</h1>

        {/* Theme Settings */}
        <section className="bg-white dark:bg-zinc-800 rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4">Appearance</h2>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {isDarkMode ? <Moon size={20} /> : <Sun size={20} />}
              <span className="text-zinc-700 dark:text-zinc-300">Dark Mode</span>
            </div>
            <button
              onClick={toggleTheme}
              className="relative inline-flex h-6 w-11 items-center rounded-full bg-zinc-200 dark:bg-zinc-700"
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                  isDarkMode ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </section>

        {/* Review Settings */}
        <section className="bg-white dark:bg-zinc-800 rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4">Review Preferences</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                Daily Review Goal
              </label>
              <input
                type="number"
                value={dailyGoal}
                onChange={(e) => setDailyGoal(Number(e.target.value))}
                className="w-1/4 px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100"
                min="1"
                max="100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                Daily Reminder Time
              </label>
              <input
                type="time"
                value={reminderTime}
                onChange={(e) => setReminderTime(e.target.value)}
                className="w-1/4 px-3 py-3 rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100"
              />
            </div>
          </div>
        </section>

        {/* Data Management */}
        <section className="bg-white dark:bg-zinc-800 rounded-xl p-6 shadow-sm">
          <h2 className="text-lg text-center font-semibold text-zinc-900 dark:text-zinc-100 mb-4">Data Management</h2>
          <div className="space-y-4">
            <Button
              onClick={exportData}
              variant="secondary"
              className="w-full"
            >
              <Download size={18} /> Export Data
            </Button>
            <div>
              <input
                type="file"
                accept=".json"
                onChange={importData}
                className="hidden"
                id="import-data"
                disabled={isImporting}
              />
              <label htmlFor="import-data">
                <Button
                  variant="secondary"
                  className="w-full"
                  disabled={isImporting}
                >
                  <Upload size={18} /> {isImporting ? 'Importing...' : 'Import Data'}
                </Button>
              </label>
            </div>
            <Button
              onClick={resetData}
              variant="danger"
              className="w-full"
            >
              <Trash2 size={18} /> Reset All Data
            </Button>
          </div>
        </section>
      </div>

      <Toast
        open={toastOpen}
        onOpenChange={setToastOpen}
        title={toastMessage.title}
        description={toastMessage.description}
      />
    </Container>
  );
} 