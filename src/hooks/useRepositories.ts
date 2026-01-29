import { useState, useCallback, useEffect } from 'react';
import type { Repository, RepositoryFormData, SyncStatus } from '@/types/repository';
import { mockRepositories } from '@/data/mockRepositories';
import { mockSnapshots } from '@/data/mockSnapshots';
import type { Snapshot } from '@/types/snapshot';

const STORAGE_KEY = 'restic-repositories';
const CURRENT_REPO_KEY = 'restic-current-repo';

export function useRepositories() {
  // Load repositories from localStorage or use mock data
  const [repositories, setRepositories] = useState<Repository[]>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch {
          return mockRepositories;
        }
      }
    }
    return mockRepositories;
  });

  const [currentRepository, setCurrentRepository] = useState<Repository | null>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(CURRENT_REPO_KEY);
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch {
          return mockRepositories[0];
        }
      }
    }
    return mockRepositories[0] || null;
  });

  const [syncStatus, setSyncStatus] = useState<SyncStatus>({
    isSyncing: false,
    lastSyncAt: currentRepository?.lastSyncAt
  });

  const [snapshots, setSnapshots] = useState<Snapshot[]>(mockSnapshots);

  // Persist repositories to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(repositories));
    }
  }, [repositories]);

  // Persist current repository to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined' && currentRepository) {
      localStorage.setItem(CURRENT_REPO_KEY, JSON.stringify(currentRepository));
    }
  }, [currentRepository]);

  const addRepository = useCallback((data: RepositoryFormData) => {
    const newRepo: Repository = {
      id: `repo-${Date.now()}`,
      ...data,
      createdAt: new Date().toISOString()
    };
    setRepositories(prev => [...prev, newRepo]);
    if (!currentRepository) {
      setCurrentRepository(newRepo);
    }
    return newRepo;
  }, [currentRepository]);

  const updateRepository = useCallback((id: string, data: Partial<RepositoryFormData>) => {
    setRepositories(prev => prev.map(repo => 
      repo.id === id ? { ...repo, ...data } : repo
    ));
    if (currentRepository?.id === id) {
      setCurrentRepository(prev => prev ? { ...prev, ...data } : null);
    }
  }, [currentRepository]);

  const deleteRepository = useCallback((id: string) => {
    setRepositories(prev => prev.filter(repo => repo.id !== id));
    if (currentRepository?.id === id) {
      const remaining = repositories.filter(repo => repo.id !== id);
      setCurrentRepository(remaining[0] || null);
    }
  }, [currentRepository, repositories]);

  const switchRepository = useCallback((id: string) => {
    const repo = repositories.find(r => r.id === id);
    if (repo) {
      setCurrentRepository(repo);
      setSyncStatus({
        isSyncing: false,
        lastSyncAt: repo.lastSyncAt
      });
      // In real implementation, this would fetch snapshots from the new repo
      return true;
    }
    return false;
  }, [repositories]);

  const refreshSnapshots = useCallback(async () => {
    if (!currentRepository) return;

    setSyncStatus({ isSyncing: true });

    // Simulate API call to restic
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Update last sync time
    const now = new Date().toISOString();
    const updatedRepo = { ...currentRepository, lastSyncAt: now };
    
    setRepositories(prev => prev.map(repo => 
      repo.id === currentRepository.id ? updatedRepo : repo
    ));
    setCurrentRepository(updatedRepo);
    
    // In real implementation, this would fetch actual snapshots from restic
    // For now, we'll just shuffle the mock data to simulate changes
    setSnapshots(prev => [...prev].sort(() => Math.random() - 0.5));

    setSyncStatus({
      isSyncing: false,
      lastSyncAt: now
    });
  }, [currentRepository]);

  return {
    repositories,
    currentRepository,
    syncStatus,
    snapshots,
    addRepository,
    updateRepository,
    deleteRepository,
    switchRepository,
    refreshSnapshots
  };
}
