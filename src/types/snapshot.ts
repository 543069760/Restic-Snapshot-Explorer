export interface Snapshot {
  id: string;
  shortId: string;
  time: string;
  hostname: string;
  username: string;
  tags: string[];
  paths: string[];
  size: number;
  fileCount: number;
  dirCount: number;
}

export interface FileInfo {
  name: string;
  type: 'file' | 'dir';
  size?: number;
  mode: string;
  mtime: string;
  uid: number;
  gid: number;
}

export interface SnapshotTree {
  path: string;
  nodes: FileInfo[];
}

export type FilterPeriod = 'all' | '24h' | '7d' | '30d';

export interface Stats {
  totalSnapshots: number;
  totalSize: number;
  uniqueSize: number;
  compressionRatio: number;
}
