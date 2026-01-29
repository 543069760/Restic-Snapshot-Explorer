import type { Snapshot, FileInfo, Stats } from '@/types/snapshot';

export const mockSnapshots: Snapshot[] = [
  {
    id: 'a1b2c3d4e5f6789012345678901234567890abcd',
    shortId: 'a1b2c3d4',
    time: '2024-01-29T14:32:18Z',
    hostname: 'server-prod-01',
    username: 'backup',
    tags: ['daily', 'automated'],
    paths: ['/home/data', '/var/www'],
    size: 45234567890,
    fileCount: 15234,
    dirCount: 892
  },
  {
    id: 'b2c3d4e5f6789012345678901234567890abcdef',
    shortId: 'b2c3d4e5',
    time: '2024-01-29T08:15:42Z',
    hostname: 'server-dev-02',
    username: 'developer',
    tags: ['manual', 'testing'],
    paths: ['/home/developer/projects'],
    size: 1234567890,
    fileCount: 3456,
    dirCount: 234
  },
  {
    id: 'c3d4e5f6789012345678901234567890abcdef12',
    shortId: 'c3d4e5f6',
    time: '2024-01-28T22:00:00Z',
    hostname: 'laptop-user',
    username: 'user',
    tags: ['daily', 'automated'],
    paths: ['/home/user/Documents', '/home/user/Pictures'],
    size: 8912345678,
    fileCount: 8765,
    dirCount: 567
  },
  {
    id: 'd4e5f6789012345678901234567890abcdef1234',
    shortId: 'd4e5f678',
    time: '2024-01-28T14:30:00Z',
    hostname: 'server-prod-01',
    username: 'backup',
    tags: ['daily', 'automated'],
    paths: ['/home/data', '/var/www', '/etc/nginx'],
    size: 45123456789,
    fileCount: 15123,
    dirCount: 889
  },
  {
    id: 'e5f6789012345678901234567890abcdef123456',
    shortId: 'e5f67890',
    time: '2024-01-27T10:45:30Z',
    hostname: 'server-db-01',
    username: 'postgres',
    tags: ['hourly', 'database'],
    paths: ['/var/lib/postgresql/data'],
    size: 234567890123,
    fileCount: 456,
    dirCount: 23
  },
  {
    id: 'f6789012345678901234567890abcdef12345678',
    shortId: 'f6789012',
    time: '2024-01-27T06:00:00Z',
    hostname: 'server-prod-01',
    username: 'backup',
    tags: ['daily', 'automated'],
    paths: ['/home/data', '/var/www'],
    size: 45098765432,
    fileCount: 15098,
    dirCount: 887
  },
  {
    id: '6789012345678901234567890abcdef123456789',
    shortId: '67890123',
    time: '2024-01-26T20:15:00Z',
    hostname: 'workstation-design',
    username: 'designer',
    tags: ['weekly', 'projects'],
    paths: ['/home/designer/Projects', '/home/designer/Assets'],
    size: 56789012345,
    fileCount: 23456,
    dirCount: 1234
  },
  {
    id: '789012345678901234567890abcdef1234567890',
    shortId: '78901234',
    time: '2024-01-26T14:32:18Z',
    hostname: 'server-prod-01',
    username: 'backup',
    tags: ['daily', 'automated'],
    paths: ['/home/data', '/var/www'],
    size: 45087654321,
    fileCount: 15087,
    dirCount: 886
  },
  {
    id: '89012345678901234567890abcdef12345678901',
    shortId: '89012345',
    time: '2024-01-25T22:00:00Z',
    hostname: 'laptop-user',
    username: 'user',
    tags: ['daily', 'automated'],
    paths: ['/home/user/Documents', '/home/user/Pictures'],
    size: 8890123456,
    fileCount: 8743,
    dirCount: 564
  },
  {
    id: '9012345678901234567890abcdef123456789012',
    shortId: '90123456',
    time: '2024-01-25T16:45:00Z',
    hostname: 'server-dev-02',
    username: 'developer',
    tags: ['manual', 'release'],
    paths: ['/home/developer/release-v2.0'],
    size: 2345678901,
    fileCount: 5678,
    dirCount: 345
  },
  {
    id: '012345678901234567890abcdef1234567890123',
    shortId: '01234567',
    time: '2024-01-24T08:00:00Z',
    hostname: 'server-prod-01',
    username: 'backup',
    tags: ['daily', 'automated'],
    paths: ['/home/data', '/var/www'],
    size: 45076543210,
    fileCount: 15076,
    dirCount: 885
  },
  {
    id: '12345678901234567890abcdef12345678901234',
    shortId: '12345678',
    time: '2024-01-24T02:30:00Z',
    hostname: 'server-db-01',
    username: 'postgres',
    tags: ['hourly', 'database'],
    paths: ['/var/lib/postgresql/data'],
    size: 234456789012,
    fileCount: 455,
    dirCount: 23
  },
  {
    id: '2345678901234567890abcdef123456789012345',
    shortId: '23456789',
    time: '2024-01-23T18:15:00Z',
    hostname: 'nas-storage',
    username: 'admin',
    tags: ['weekly', 'archive'],
    paths: ['/mnt/storage/archive'],
    size: 1234567890123,
    fileCount: 56789,
    dirCount: 3456
  },
  {
    id: '345678901234567890abcdef1234567890123456',
    shortId: '34567890',
    time: '2024-01-23T14:32:18Z',
    hostname: 'server-prod-01',
    username: 'backup',
    tags: ['daily', 'automated'],
    paths: ['/home/data', '/var/www'],
    size: 45065432109,
    fileCount: 15065,
    dirCount: 884
  },
  {
    id: '45678901234567890abcdef12345678901234567',
    shortId: '45678901',
    time: '2024-01-22T20:00:00Z',
    hostname: 'laptop-user',
    username: 'user',
    tags: ['daily', 'automated'],
    paths: ['/home/user/Documents', '/home/user/Pictures'],
    size: 8876543210,
    fileCount: 8721,
    dirCount: 561
  },
  {
    id: '5678901234567890abcdef123456789012345678',
    shortId: '56789012',
    time: '2024-01-22T12:00:00Z',
    hostname: 'server-dev-02',
    username: 'developer',
    tags: ['manual', 'backup'],
    paths: ['/home/developer/important'],
    size: 1234567890,
    fileCount: 3456,
    dirCount: 234
  },
  {
    id: '678901234567890abcdef1234567890123456789',
    shortId: '67890123',
    time: '2024-01-21T14:32:18Z',
    hostname: 'server-prod-01',
    username: 'backup',
    tags: ['daily', 'automated'],
    paths: ['/home/data', '/var/www'],
    size: 45054321098,
    fileCount: 15054,
    dirCount: 883
  },
  {
    id: '78901234567890abcdef12345678901234567890',
    shortId: '78901234',
    time: '2024-01-21T06:30:00Z',
    hostname: 'workstation-design',
    username: 'designer',
    tags: ['weekly', 'projects'],
    paths: ['/home/designer/Projects', '/home/designer/Assets'],
    size: 56701234567,
    fileCount: 23445,
    dirCount: 1233
  },
  {
    id: '8901234567890abcdef123456789012345678901',
    shortId: '89012345',
    time: '2024-01-20T22:00:00Z',
    hostname: 'laptop-user',
    username: 'user',
    tags: ['daily', 'automated'],
    paths: ['/home/user/Documents', '/home/user/Pictures'],
    size: 8865432109,
    fileCount: 8698,
    dirCount: 558
  },
  {
    id: '901234567890abcdef1234567890123456789012',
    shortId: '90123456',
    time: '2024-01-20T14:32:18Z',
    hostname: 'server-prod-01',
    username: 'backup',
    tags: ['daily', 'automated'],
    paths: ['/home/data', '/var/www'],
    size: 45043210987,
    fileCount: 15043,
    dirCount: 882
  }
];

export const mockStats: Stats = {
  totalSnapshots: 1247,
  totalSize: 2634567890123,
  uniqueSize: 892345678901,
  compressionRatio: 62
};

export const mockFileTree: FileInfo[] = [
  { name: 'home', type: 'dir', mode: 'drwxr-xr-x', mtime: '2024-01-29T14:30:00Z', uid: 0, gid: 0 },
  { name: 'var', type: 'dir', mode: 'drwxr-xr-x', mtime: '2024-01-29T14:25:00Z', uid: 0, gid: 0 },
  { name: 'etc', type: 'dir', mode: 'drwxr-xr-x', mtime: '2024-01-29T14:20:00Z', uid: 0, gid: 0 },
  { name: 'usr', type: 'dir', mode: 'drwxr-xr-x', mtime: '2024-01-29T14:15:00Z', uid: 0, gid: 0 },
  { name: 'opt', type: 'dir', mode: 'drwxr-xr-x', mtime: '2024-01-29T14:10:00Z', uid: 0, gid: 0 },
  { name: 'root', type: 'dir', mode: 'drwx------', mtime: '2024-01-29T14:05:00Z', uid: 0, gid: 0 },
  { name: 'tmp', type: 'dir', mode: 'drwxrwxrwt', mtime: '2024-01-29T14:00:00Z', uid: 0, gid: 0 },
  { name: 'boot', type: 'dir', mode: 'drwxr-xr-x', mtime: '2024-01-29T13:55:00Z', uid: 0, gid: 0 },
  { name: 'backup.log', type: 'file', size: 1234567, mode: '-rw-r--r--', mtime: '2024-01-29T14:32:18Z', uid: 0, gid: 0 },
  { name: 'README.md', type: 'file', size: 4096, mode: '-rw-r--r--', mtime: '2024-01-29T14:30:00Z', uid: 1000, gid: 1000 }
];

export const mockSubFiles: Record<string, FileInfo[]> = {
  '/home': [
    { name: 'data', type: 'dir', mode: 'drwxr-xr-x', mtime: '2024-01-29T14:30:00Z', uid: 1000, gid: 1000 },
    { name: 'user', type: 'dir', mode: 'drwxr-xr-x', mtime: '2024-01-29T14:25:00Z', uid: 1000, gid: 1000 },
    { name: 'backup', type: 'dir', mode: 'drwxr-xr-x', mtime: '2024-01-29T14:20:00Z', uid: 0, gid: 0 },
    { name: 'developer', type: 'dir', mode: 'drwxr-xr-x', mtime: '2024-01-29T14:15:00Z', uid: 1001, gid: 1001 }
  ],
  '/var': [
    { name: 'www', type: 'dir', mode: 'drwxr-xr-x', mtime: '2024-01-29T14:30:00Z', uid: 33, gid: 33 },
    { name: 'log', type: 'dir', mode: 'drwxr-xr-x', mtime: '2024-01-29T14:25:00Z', uid: 0, gid: 4 },
    { name: 'lib', type: 'dir', mode: 'drwxr-xr-x', mtime: '2024-01-29T14:20:00Z', uid: 0, gid: 0 },
    { name: 'spool', type: 'dir', mode: 'drwxr-xr-x', mtime: '2024-01-29T14:15:00Z', uid: 0, gid: 0 },
    { name: 'cache', type: 'dir', mode: 'drwxr-xr-x', mtime: '2024-01-29T14:10:00Z', uid: 0, gid: 0 }
  ],
  '/etc': [
    { name: 'nginx', type: 'dir', mode: 'drwxr-xr-x', mtime: '2024-01-29T14:30:00Z', uid: 0, gid: 0 },
    { name: 'apache2', type: 'dir', mode: 'drwxr-xr-x', mtime: '2024-01-29T14:25:00Z', uid: 0, gid: 0 },
    { name: 'mysql', type: 'dir', mode: 'drwxr-xr-x', mtime: '2024-01-29T14:20:00Z', uid: 0, gid: 0 },
    { name: 'postgresql', type: 'dir', mode: 'drwxr-xr-x', mtime: '2024-01-29T14:15:00Z', uid: 0, gid: 0 },
    { name: 'hosts', type: 'file', size: 253, mode: '-rw-r--r--', mtime: '2024-01-29T14:10:00Z', uid: 0, gid: 0 },
    { name: 'fstab', type: 'file', size: 1024, mode: '-rw-r--r--', mtime: '2024-01-29T14:05:00Z', uid: 0, gid: 0 }
  ],
  '/home/data': [
    { name: 'customers', type: 'dir', mode: 'drwxr-xr-x', mtime: '2024-01-29T14:30:00Z', uid: 1000, gid: 1000 },
    { name: 'orders', type: 'dir', mode: 'drwxr-xr-x', mtime: '2024-01-29T14:25:00Z', uid: 1000, gid: 1000 },
    { name: 'products', type: 'dir', mode: 'drwxr-xr-x', mtime: '2024-01-29T14:20:00Z', uid: 1000, gid: 1000 },
    { name: 'inventory.db', type: 'file', size: 2147483648, mode: '-rw-r--r--', mtime: '2024-01-29T14:15:00Z', uid: 1000, gid: 1000 },
    { name: 'config.json', type: 'file', size: 8192, mode: '-rw-r--r--', mtime: '2024-01-29T14:10:00Z', uid: 1000, gid: 1000 }
  ],
  '/var/www': [
    { name: 'html', type: 'dir', mode: 'drwxr-xr-x', mtime: '2024-01-29T14:30:00Z', uid: 33, gid: 33 },
    { name: 'api', type: 'dir', mode: 'drwxr-xr-x', mtime: '2024-01-29T14:25:00Z', uid: 33, gid: 33 },
    { name: 'static', type: 'dir', mode: 'drwxr-xr-x', mtime: '2024-01-29T14:20:00Z', uid: 33, gid: 33 },
    { name: 'uploads', type: 'dir', mode: 'drwxr-xr-x', mtime: '2024-01-29T14:15:00Z', uid: 33, gid: 33 },
    { name: 'index.html', type: 'file', size: 4096, mode: '-rw-r--r--', mtime: '2024-01-29T14:10:00Z', uid: 33, gid: 33 }
  ]
};
