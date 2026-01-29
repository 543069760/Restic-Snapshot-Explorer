import type { Repository } from '@/types/repository';

export const mockRepositories: Repository[] = [
  {
    id: 'repo-001',
    name: '本地备份仓库',
    url: '/backup/restic-repo',
    password: '********',
    type: 'local',
    customVars: [
      { id: 'var-1', key: 'BACKUP_RETENTION', value: '30d' },
      { id: 'var-2', key: 'COMPRESSION_LEVEL', value: 'auto' }
    ],
    customParams: [
      { id: 'param-1', value: '--verbose' },
      { id: 'param-2', value: '--cleanup-cache' }
    ],
    createdAt: '2024-01-15T08:00:00Z',
    lastSyncAt: '2024-01-29T14:32:18Z'
  },
  {
    id: 'repo-002',
    name: 'SFTP 远程仓库',
    url: 'sftp:user@backup.example.com:/restic-repo',
    password: '********',
    type: 'sftp',
    customVars: [
      { id: 'var-1', key: 'SFTP_PORT', value: '22' },
      { id: 'var-2', key: 'SSH_KEY_PATH', value: '~/.ssh/id_rsa' }
    ],
    customParams: [
      { id: 'param-1', value: '--limit-upload=10000' },
      { id: 'param-2', value: '--option sftp.command=\'ssh -i /key\'' }
    ],
    createdAt: '2024-01-20T10:30:00Z',
    lastSyncAt: '2024-01-28T22:00:00Z'
  },
  {
    id: 'repo-003',
    name: 'AWS S3 仓库',
    url: 's3:s3.amazonaws.com/my-backup-bucket',
    password: '********',
    type: 's3',
    options: {
      'AWS_ACCESS_KEY_ID': 'AKIA...',
      'AWS_SECRET_ACCESS_KEY': '********'
    },
    customVars: [
      { id: 'var-1', key: 'AWS_REGION', value: 'us-east-1' },
      { id: 'var-2', key: 'S3_STORAGE_CLASS', value: 'STANDARD_IA' }
    ],
    customParams: [
      { id: 'param-1', value: '--option s3.region=us-east-1' },
      { id: 'param-2', value: '--option s3.storage-class=STANDARD_IA' }
    ],
    createdAt: '2024-01-25T16:45:00Z',
    lastSyncAt: '2024-01-27T18:15:00Z'
  }
];
