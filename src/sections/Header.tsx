import { 
  Database, Settings, RefreshCw, ChevronDown, Check, 
  HardDrive, Server, Cloud, Globe, Plus
} from 'lucide-react';
import type { Repository, SyncStatus } from '@/types/repository';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface HeaderProps {
  repositories: Repository[];
  currentRepository: Repository | null;
  syncStatus: SyncStatus;
  onSwitchRepository: (id: string) => void;
  onRefreshSnapshots: () => void;
  onOpenSettings: () => void;
}

function getTypeIcon(type: string) {
  switch (type) {
    case 'local':
      return <HardDrive className="h-4 w-4" />;
    case 'sftp':
      return <Server className="h-4 w-4" />;
    case 'rest':
      return <Globe className="h-4 w-4" />;
    default:
      return <Cloud className="h-4 w-4" />;
  }
}

export function Header({
  repositories,
  currentRepository,
  syncStatus,
  onSwitchRepository,
  onRefreshSnapshots,
  onOpenSettings
}: HeaderProps) {
  const handleRefresh = async () => {
    await onRefreshSnapshots();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-white/10 bg-zinc-950/80 backdrop-blur-xl">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-sky-500 to-violet-500">
            <Database className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-semibold text-zinc-100 hidden sm:block">
            Restic Snapshot Explorer
          </span>
        </div>

        {/* Center: Repository Selector */}
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="min-w-[160px] justify-between border-white/10 bg-zinc-900/50 text-zinc-100 hover:bg-zinc-800 hover:text-zinc-100"
              >
                <div className="flex items-center gap-2">
                  {currentRepository ? (
                    <>
                      {getTypeIcon(currentRepository.type)}
                      <span className="max-w-[120px] truncate">{currentRepository.name}</span>
                    </>
                  ) : (
                    <span className="text-zinc-500">选择仓库</span>
                  )}
                </div>
                <ChevronDown className="h-4 w-4 text-zinc-500" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              align="center" 
              className="w-64 border-white/10 bg-zinc-900 text-zinc-100"
            >
              <DropdownMenuLabel className="text-zinc-500">
                选择仓库 ({repositories.length})
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-white/10" />
              {repositories.map((repo) => (
                <DropdownMenuItem
                  key={repo.id}
                  onClick={() => onSwitchRepository(repo.id)}
                  className="flex items-center justify-between cursor-pointer focus:bg-zinc-800 focus:text-zinc-100"
                >
                  <div className="flex items-center gap-2">
                    {getTypeIcon(repo.type)}
                    <span className="truncate">{repo.name}</span>
                  </div>
                  {currentRepository?.id === repo.id && (
                    <Check className="h-4 w-4 text-sky-400" />
                  )}
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator className="bg-white/10" />
              <DropdownMenuItem
                onClick={onOpenSettings}
                className="cursor-pointer focus:bg-zinc-800 focus:text-zinc-100"
              >
                <Plus className="mr-2 h-4 w-4" />
                管理仓库...
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Refresh Button */}
          <Button
            variant="outline"
            size="icon"
            onClick={handleRefresh}
            disabled={syncStatus.isSyncing || !currentRepository}
            className="border-white/10 bg-zinc-900/50 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100 disabled:opacity-50"
            title="刷新快照索引"
          >
            <RefreshCw className={cn(
              "h-4 w-4",
              syncStatus.isSyncing && "animate-spin"
            )} />
          </Button>
        </div>

        {/* Right: Settings & Status */}
        <div className="flex items-center gap-3">
          {/* Sync Status */}
          {syncStatus.isSyncing ? (
            <Badge 
              variant="outline" 
              className="hidden sm:flex border-amber-500/30 bg-amber-500/10 text-amber-400"
            >
              <RefreshCw className="mr-1.5 h-3 w-3 animate-spin" />
              同步中...
            </Badge>
          ) : syncStatus.lastSyncAt ? (
            <Badge 
              variant="outline" 
              className="hidden sm:flex border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
            >
              <Check className="mr-1.5 h-3 w-3" />
              已同步
            </Badge>
          ) : (
            <Badge 
              variant="outline" 
              className="hidden sm:flex border-zinc-500/30 bg-zinc-500/10 text-zinc-400"
            >
              未同步
            </Badge>
          )}

          {/* Settings Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onOpenSettings}
            className="text-zinc-400 hover:text-zinc-100"
            title="仓库设置"
          >
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
