export interface KeyValuePair {
  id: string;
  key: string;
  value: string;
}

export interface CustomParam {
  id: string;
  value: string;
}

export interface Repository {
  id: string;
  name: string;
  url: string;
  password: string;
  type: 'local' | 'sftp' | 's3' | 'b2' | 'azure' | 'gs' | 'rest';
  options?: Record<string, string>;
  customVars: KeyValuePair[];
  customParams: CustomParam[];
  createdAt: string;
  lastSyncAt?: string;
}

export interface RepositoryFormData {
  name: string;
  url: string;
  password: string;
  type: 'local' | 'sftp' | 's3' | 'b2' | 'azure' | 'gs' | 'rest';
  options?: Record<string, string>;
  customVars: KeyValuePair[];
  customParams: CustomParam[];
}

export const REPOSITORY_TYPES = [
  { value: 'local', label: '本地路径', icon: 'HardDrive' },
  { value: 'sftp', label: 'SFTP', icon: 'Server' },
  { value: 's3', label: 'Amazon S3', icon: 'Cloud' },
  { value: 'b2', label: 'Backblaze B2', icon: 'Cloud' },
  { value: 'azure', label: 'Azure Blob', icon: 'Cloud' },
  { value: 'gs', label: 'Google Cloud Storage', icon: 'Cloud' },
  { value: 'rest', label: 'REST Server', icon: 'Globe' }
] as const;

export interface SyncStatus {
  isSyncing: boolean;
  lastSyncAt?: string;
  error?: string;
}
