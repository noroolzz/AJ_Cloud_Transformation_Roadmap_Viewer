import { Outlet } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { FilterPanel } from '@/components/FilterPanel';

export function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navigation />
      <div className="flex flex-1 min-h-0">
        <FilterPanel />
        <main className="flex-1 min-w-0 flex flex-col">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
