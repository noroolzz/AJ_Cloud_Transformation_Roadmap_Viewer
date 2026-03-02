import { Routes, Route } from 'react-router-dom';
import {
  InitiativesProvider,
  FiltersProvider,
  SelectedInitiativeProvider,
} from '@/contexts';
import { AppLayout } from '@/components/AppLayout';
import { InitiativeListView } from '@/features/initiative-list';
import { InitiativeDetailModal } from '@/components/InitiativeDetailModal';

function App() {
  return (
    <InitiativesProvider>
      <FiltersProvider>
        <SelectedInitiativeProvider>
          <Routes>
            <Route path="/" element={<AppLayout />}>
              <Route index element={<InitiativeListView />} />
            </Route>
          </Routes>
          <InitiativeDetailModal />
        </SelectedInitiativeProvider>
      </FiltersProvider>
    </InitiativesProvider>
  );
}

export default App;
