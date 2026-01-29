import { useState } from 'react';
import { Toaster } from '@/components/ui/sonner';
import { Header } from '@/sections/Header';
import { Hero } from '@/sections/Hero';
import { Stats } from '@/sections/Stats';
import { SnapshotList } from '@/sections/SnapshotList';
import { SnapshotDetail } from '@/sections/SnapshotDetail';
import { RepositorySettings } from '@/sections/RepositorySettings';
import { Footer } from '@/sections/Footer';
import { useSnapshots } from '@/hooks/useSnapshots';
import { useRepositories } from '@/hooks/useRepositories';
import './App.css';

function App() {
  const {
    snapshots: filteredSnapshots,
    searchQuery,
    setSearchQuery,
    filterPeriod,
    setFilterPeriod,
    selectedSnapshot,
    isDetailOpen,
    openDetail,
    closeDetail
  } = useSnapshots();

  const {
    repositories,
    currentRepository,
    syncStatus,
    snapshots: repoSnapshots,
    addRepository,
    updateRepository,
    deleteRepository,
    switchRepository,
    refreshSnapshots
  } = useRepositories();

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Use repository snapshots if available, otherwise fall back to filtered snapshots
  const displaySnapshots = repoSnapshots.length > 0 ? repoSnapshots : filteredSnapshots;

  return (
    <div className="min-h-screen bg-zinc-950">
      <Toaster 
        position="top-right"
        toastOptions={{
          style: {
            background: '#18181b',
            border: '1px solid rgba(255,255,255,0.1)',
            color: '#fafafa'
          }
        }}
      />
      
      <Header
        repositories={repositories}
        currentRepository={currentRepository}
        syncStatus={syncStatus}
        onSwitchRepository={switchRepository}
        onRefreshSnapshots={refreshSnapshots}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />
      
      <main className="mx-auto max-w-7xl px-4 pb-8 pt-24 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <Hero
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            filterPeriod={filterPeriod}
            onFilterChange={setFilterPeriod}
          />
          
          <Stats />
          
          <SnapshotList
            snapshots={displaySnapshots}
            onViewDetail={openDetail}
          />
        </div>
      </main>
      
      <Footer />
      
      {selectedSnapshot && (
        <SnapshotDetail
          snapshot={selectedSnapshot}
          isOpen={isDetailOpen}
          onClose={closeDetail}
        />
      )}

      <RepositorySettings
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        repositories={repositories}
        currentRepository={currentRepository}
        onAdd={addRepository}
        onUpdate={updateRepository}
        onDelete={deleteRepository}
        onSwitch={switchRepository}
      />
    </div>
  );
}

export default App;
