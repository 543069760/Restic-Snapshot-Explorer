import { useState } from 'react';
import { 
  X, Clock, Server, User, Tag, Folder, HardDrive, 
  FileText, FolderTree, RotateCcw, Copy, ChevronRight,
  Search, File, CornerLeftUp
} from 'lucide-react';
import type { Snapshot, FileInfo } from '@/types/snapshot';
import { formatDate, formatBytes, getTagColor, copyToClipboard } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';
import { mockFileTree, mockSubFiles } from '@/data/mockSnapshots';

interface SnapshotDetailProps {
  snapshot: Snapshot;
  isOpen: boolean;
  onClose: () => void;
}

interface FileBrowserProps {
  snapshot: Snapshot;
}

function FileBrowser({ snapshot: _snapshot }: FileBrowserProps) {
  const [currentPath, setCurrentPath] = useState('/');
  const [searchQuery, setSearchQuery] = useState('');

  const navigateTo = (path: string) => {
    setCurrentPath(path);
  };

  const getFilesForPath = (path: string): FileInfo[] => {
    if (path === '/') {
      return mockFileTree;
    }
    return mockSubFiles[path] || [];
  };

  const currentFiles = getFilesForPath(currentPath);
  
  const filteredFiles = searchQuery.trim() 
    ? currentFiles.filter(f => f.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : currentFiles;

  const pathParts = currentPath.split('/').filter(Boolean);

  return (
    <div className="flex h-full flex-col">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1 border-b border-white/5 px-4 py-2 text-sm">
        <button
          onClick={() => navigateTo('/')}
          className="rounded px-2 py-1 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
        >
          /
        </button>
        {pathParts.map((part, index) => {
          const path = '/' + pathParts.slice(0, index + 1).join('/');
          return (
            <div key={path} className="flex items-center">
              <ChevronRight className="h-4 w-4 text-zinc-600" />
              <button
                onClick={() => navigateTo(path)}
                className="rounded px-2 py-1 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
              >
                {part}
              </button>
            </div>
          );
        })}
      </div>

      {/* Search */}
      <div className="border-b border-white/5 px-4 py-2">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
          <Input
            type="text"
            placeholder="搜索文件..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-8 border-white/10 bg-zinc-950/50 pl-9 text-sm text-zinc-100 placeholder:text-zinc-600"
          />
        </div>
      </div>

      {/* File List */}
      <ScrollArea className="flex-1">
        <div className="p-2">
          {currentPath !== '/' && (
            <button
              onClick={() => {
                const parentPath = currentPath.split('/').slice(0, -1).join('/') || '/';
                navigateTo(parentPath);
              }}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-zinc-400 hover:bg-zinc-800/50"
            >
              <CornerLeftUp className="h-4 w-4" />
              返回上级
            </button>
          )}
          
          {filteredFiles.map((file, index) => (
            <div
              key={`${file.name}-${index}`}
              className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-zinc-800/50"
            >
              {file.type === 'dir' ? (
                <button
                  onClick={() => navigateTo(`${currentPath === '/' ? '' : currentPath}/${file.name}`)}
                  className="flex flex-1 items-center gap-2 text-left"
                >
                  <Folder className="h-4 w-4 text-amber-400" />
                  <span className="text-sm text-zinc-300">{file.name}</span>
                </button>
              ) : (
                <>
                  <File className="h-4 w-4 text-sky-400" />
                  <span className="flex-1 text-sm text-zinc-300">{file.name}</span>
                  {file.size && (
                    <span className="text-xs text-zinc-500">{formatBytes(file.size)}</span>
                  )}
                </>
              )}
            </div>
          ))}
          
          {filteredFiles.length === 0 && (
            <div className="py-8 text-center text-sm text-zinc-500">
              此目录为空
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}

export function SnapshotDetail({ snapshot, isOpen, onClose }: SnapshotDetailProps) {
  const handleCopyId = async () => {
    try {
      await copyToClipboard(snapshot.id);
      toast.success('快照 ID 已复制到剪贴板');
    } catch {
      toast.error('复制失败');
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className="fixed right-0 top-0 z-50 h-full w-full max-w-2xl transform bg-zinc-950 shadow-2xl transition-transform duration-300 ease-out">
        {/* Header */}
        <div className="flex h-16 items-center justify-between border-b border-white/10 px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-sky-500 to-violet-500">
              <HardDrive className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-zinc-100">快照详情</h2>
              <div className="flex items-center gap-2">
                <code className="font-mono text-sm text-sky-400">{snapshot.shortId}</code>
                <button
                  onClick={handleCopyId}
                  className="rounded p-1 text-zinc-500 hover:bg-zinc-800 hover:text-zinc-300"
                  title="复制完整 ID"
                >
                  <Copy className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-zinc-400 hover:text-zinc-100"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="h-[calc(100%-4rem)]">
          <TabsList className="mx-6 mt-4 grid w-auto grid-cols-3 bg-zinc-900/50">
            <TabsTrigger value="overview" className="data-[state=active]:bg-zinc-800">
              <FileText className="mr-2 h-4 w-4" />
              概览
            </TabsTrigger>
            <TabsTrigger value="files" className="data-[state=active]:bg-zinc-800">
              <FolderTree className="mr-2 h-4 w-4" />
              文件
            </TabsTrigger>
            <TabsTrigger value="restore" className="data-[state=active]:bg-zinc-800">
              <RotateCcw className="mr-2 h-4 w-4" />
              恢复
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-4 h-[calc(100%-5rem)] px-6">
            <ScrollArea className="h-full">
              <div className="space-y-6 pb-6">
                {/* Basic Info */}
                <div className="rounded-xl border border-white/5 bg-zinc-900/50 p-5">
                  <h3 className="mb-4 text-sm font-medium uppercase tracking-wider text-zinc-500">
                    基本信息
                  </h3>
                  <div className="grid gap-4">
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-zinc-500" />
                      <div>
                        <p className="text-sm text-zinc-500">备份时间</p>
                        <p className="text-zinc-200">{formatDate(snapshot.time)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Server className="h-5 w-5 text-zinc-500" />
                      <div>
                        <p className="text-sm text-zinc-500">主机名</p>
                        <p className="text-zinc-200">{snapshot.hostname}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <User className="h-5 w-5 text-zinc-500" />
                      <div>
                        <p className="text-sm text-zinc-500">用户名</p>
                        <p className="text-zinc-200">{snapshot.username}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div className="rounded-xl border border-white/5 bg-zinc-900/50 p-5">
                  <h3 className="mb-4 text-sm font-medium uppercase tracking-wider text-zinc-500">
                    标签
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {snapshot.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className={`text-sm ${getTagColor(tag)}`}
                      >
                        <Tag className="mr-1 h-3 w-3" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Paths */}
                <div className="rounded-xl border border-white/5 bg-zinc-900/50 p-5">
                  <h3 className="mb-4 text-sm font-medium uppercase tracking-wider text-zinc-500">
                    备份路径
                  </h3>
                  <div className="space-y-2">
                    {snapshot.paths.map((path, index) => (
                      <div key={index} className="flex items-center gap-2 text-zinc-300">
                        <Folder className="h-4 w-4 text-zinc-600" />
                        <code className="rounded bg-zinc-950 px-2 py-1 text-sm">{path}</code>
                      </div>
                    ))}
                  </div>
                </div>

                {/* File Stats */}
                <div className="rounded-xl border border-white/5 bg-zinc-900/50 p-5">
                  <h3 className="mb-4 text-sm font-medium uppercase tracking-wider text-zinc-500">
                    文件统计
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="rounded-lg bg-zinc-950/50 p-4 text-center">
                      <p className="text-2xl font-bold text-sky-400">{snapshot.fileCount.toLocaleString()}</p>
                      <p className="text-xs text-zinc-500">文件</p>
                    </div>
                    <div className="rounded-lg bg-zinc-950/50 p-4 text-center">
                      <p className="text-2xl font-bold text-violet-400">{snapshot.dirCount.toLocaleString()}</p>
                      <p className="text-xs text-zinc-500">目录</p>
                    </div>
                    <div className="rounded-lg bg-zinc-950/50 p-4 text-center">
                      <p className="text-2xl font-bold text-emerald-400">{formatBytes(snapshot.size)}</p>
                      <p className="text-xs text-zinc-500">总大小</p>
                    </div>
                  </div>
                </div>

                {/* Full ID */}
                <div className="rounded-xl border border-white/5 bg-zinc-900/50 p-5">
                  <h3 className="mb-4 text-sm font-medium uppercase tracking-wider text-zinc-500">
                    完整 ID
                  </h3>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 break-all rounded bg-zinc-950 px-3 py-2 font-mono text-xs text-zinc-400">
                      {snapshot.id}
                    </code>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCopyId}
                      className="border-white/10 bg-zinc-900 text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100"
                    >
                      <Copy className="mr-2 h-4 w-4" />
                      复制
                    </Button>
                  </div>
                </div>
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="files" className="mt-4 h-[calc(100%-5rem)]">
            <FileBrowser snapshot={snapshot} />
          </TabsContent>

          <TabsContent value="restore" className="mt-4 h-[calc(100%-5rem)] px-6">
            <ScrollArea className="h-full">
              <div className="space-y-6 pb-6">
                <div className="rounded-xl border border-white/5 bg-zinc-900/50 p-5">
                  <h3 className="mb-4 text-sm font-medium uppercase tracking-wider text-zinc-500">
                    恢复选项
                  </h3>
                  <div className="space-y-4">
                    <div className="rounded-lg border border-white/5 bg-zinc-950/50 p-4">
                      <h4 className="mb-2 font-medium text-zinc-200">恢复到原始位置</h4>
                      <p className="mb-4 text-sm text-zinc-500">
                        将文件恢复到备份时的原始路径
                      </p>
                      <Button className="bg-gradient-to-r from-sky-500 to-violet-500 text-white hover:from-sky-600 hover:to-violet-600">
                        <RotateCcw className="mr-2 h-4 w-4" />
                        开始恢复
                      </Button>
                    </div>
                    
                    <div className="rounded-lg border border-white/5 bg-zinc-950/50 p-4">
                      <h4 className="mb-2 font-medium text-zinc-200">恢复到指定路径</h4>
                      <p className="mb-4 text-sm text-zinc-500">
                        将文件恢复到自定义路径
                      </p>
                      <div className="flex gap-2">
                        <Input
                          type="text"
                          placeholder="/path/to/restore"
                          className="flex-1 border-white/10 bg-zinc-900 text-zinc-100 placeholder:text-zinc-600"
                        />
                        <Button className="bg-gradient-to-r from-sky-500 to-violet-500 text-white hover:from-sky-600 hover:to-violet-600">
                          <RotateCcw className="mr-2 h-4 w-4" />
                          恢复
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-amber-500/20 bg-amber-500/10 p-4">
                  <p className="text-sm text-amber-400">
                    <strong>注意：</strong> 恢复操作将覆盖目标路径的现有文件。建议在恢复前备份重要数据。
                  </p>
                </div>
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
