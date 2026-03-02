import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';

export function Navigation() {
  return (
    <nav className="bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-14 items-center">
          <Link
            to={ROUTES.HOME}
            className="text-lg font-semibold text-primary-600 hover:text-primary-700"
          >
            Cloud Roadmap Viewer
          </Link>
          <div className="flex gap-6">
            <Link
              to={ROUTES.HOME}
              className="text-slate-600 hover:text-slate-900 font-medium"
            >
              Home
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
