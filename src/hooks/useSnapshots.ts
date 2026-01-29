import { useState, useMemo, useCallback } from 'react';
import type { Snapshot, FilterPeriod } from '@/types/snapshot';
import { mockSnapshots } from '@/data/mockSnapshots';

export function useSnapshots() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPeriod, setFilterPeriod] = useState<FilterPeriod>('all');
  const [selectedSnapshot, setSelectedSnapshot] = useState<Snapshot | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const filteredSnapshots = useMemo(() => {
    let result = [...mockSnapshots];

    // Apply period filter
    if (filterPeriod !== 'all') {
      const now = new Date();
      const cutoffDate = new Date();
      
      switch (filterPeriod) {
        case '24h':
          cutoffDate.setHours(now.getHours() - 24);
          break;
        case '7d':
          cutoffDate.setDate(now.getDate() - 7);
          break;
        case '30d':
          cutoffDate.setDate(now.getDate() - 30);
          break;
      }
      
      result = result.filter(s => new Date(s.time) >= cutoffDate);
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(s => 
        s.shortId.toLowerCase().includes(query) ||
        s.hostname.toLowerCase().includes(query) ||
        s.username.toLowerCase().includes(query) ||
        s.tags.some(tag => tag.toLowerCase().includes(query)) ||
        s.paths.some(path => path.toLowerCase().includes(query))
      );
    }

    // Sort by time (newest first)
    result.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());

    return result;
  }, [searchQuery, filterPeriod]);

  const openDetail = useCallback((snapshot: Snapshot) => {
    setSelectedSnapshot(snapshot);
    setIsDetailOpen(true);
  }, []);

  const closeDetail = useCallback(() => {
    setIsDetailOpen(false);
    setTimeout(() => setSelectedSnapshot(null), 300);
  }, []);

  return {
    snapshots: filteredSnapshots,
    searchQuery,
    setSearchQuery,
    filterPeriod,
    setFilterPeriod,
    selectedSnapshot,
    isDetailOpen,
    openDetail,
    closeDetail
  };
}
