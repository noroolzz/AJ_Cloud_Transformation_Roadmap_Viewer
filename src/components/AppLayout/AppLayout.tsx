import { Outlet } from 'react-router-dom';
import { useInitiatives } from '@/contexts';
import { Navigation } from '@/components/Navigation';
import { FilterPanel } from '@/components/FilterPanel';

export function AppLayout() {
  const { error } = useInitiatives();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navigation />
      {error && (
        <div
          className="bg-red-50 border-b border-red-200 px-4 py-3 text-red-800 text-sm"
          role="alert"
        >
          {error}
        </div>
      )}
      <div className="flex flex-1 min-h-0">
        <FilterPanel />
        <main className="flex-1 min-w-0 flex flex-col">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
