import { useState } from 'react';
import { 
  Clock, Server, User, Tag, Folder, HardDrive, 
  Copy, Trash2, Eye, FileText 
} from 'lucide-react';
import type { Snapshot } from '@/types/snapshot';
import { formatDate, formatBytes, formatRelativeTime, getTagColor, copyToClipboard } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface SnapshotListProps {
  snapshots: Snapshot[];
  onViewDetail: (snapshot: Snapshot) => void;
}

interface SnapshotRowProps {
  snapshot: Snapshot;
  index: number;
  onViewDetail: (snapshot: Snapshot) => void;
}

function SnapshotRow({ snapshot, index, onViewDetail }: SnapshotRowProps) {
  const [showActions, setShowActions] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleCopyId = async () => {
    try {
      await copyToClipboard(snapshot.id);
      toast.success('快照 ID 已复制到剪贴板');
    } catch {
      toast.error('复制失败');
    }
  };

  const handleDelete = () => {
    toast.success(`快照 ${snapshot.shortId} 已删除`);
    setDeleteDialogOpen(false);
  };

  return (
    <>
      <tr
        className="group border-b border-white/5 transition-colors hover:bg-zinc-800/50"
        style={{ animationDelay: `${200 + index * 50}ms` }}
        onMouseEnter={() => setShowActions(true)}
        onMouseLeave={() => setShowActions(false)}
      >
        {/* Short ID */}
        <td className="whitespace-nowrap px-4 py-4">
          <div className="flex items-center gap-2">
            <code className="rounded bg-zinc-900 px-2 py-1 font-mono text-sm text-sky-400">
              {snapshot.shortId}
            </code>
            <button
              onClick={handleCopyId}
              className="rounded p-1 text-zinc-500 opacity-0 transition-all hover:bg-zinc-800 hover:text-zinc-300 group-hover:opacity-100"
              title="复制完整 ID"
            >
              <Copy className="h-3.5 w-3.5" />
            </button>
          </div>
        </td>

        {/* Time */}
        <td className="whitespace-nowrap px-4 py-4">
          <div className="flex items-center gap-2 text-zinc-300">
            <Clock className="h-4 w-4 text-zinc-500" />
            <div className="flex flex-col">
              <span className="text-sm">{formatDate(snapshot.time)}</span>
              <span className="text-xs text-zinc-500">{formatRelativeTime(snapshot.time)}</span>
            </div>
          </div>
        </td>

        {/* Hostname */}
        <td className="whitespace-nowrap px-4 py-4">
          <div className="flex items-center gap-2 text-zinc-300">
            <Server className="h-4 w-4 text-zinc-500" />
            <span className="text-sm">{snapshot.hostname}</span>
          </div>
        </td>

        {/* Username */}
        <td className="whitespace-nowrap px-4 py-4">
          <div className="flex items-center gap-2 text-zinc-300">
            <User className="h-4 w-4 text-zinc-500" />
            <span className="text-sm">{snapshot.username}</span>
          </div>
        </td>

        {/* Tags */}
        <td className="px-4 py-4">
          <div className="flex flex-wrap gap-1">
            {snapshot.tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className={`text-xs ${getTagColor(tag)}`}
              >
                <Tag className="mr-1 h-3 w-3" />
                {tag}
              </Badge>
            ))}
          </div>
        </td>

        {/* Paths */}
        <td className="px-4 py-4">
          <div className="flex flex-col gap-1">
            {snapshot.paths.slice(0, 2).map((path, i) => (
              <div key={i} className="flex items-center gap-1.5 text-sm text-zinc-400">
                <Folder className="h-3.5 w-3.5 text-zinc-600" />
                <span className="truncate max-w-[150px]" title={path}>{path}</span>
              </div>
            ))}
            {snapshot.paths.length > 2 && (
              <span className="text-xs text-zinc-500">+{snapshot.paths.length - 2} 更多</span>
            )}
          </div>
        </td>

        {/* Size */}
        <td className="whitespace-nowrap px-4 py-4">
          <div className="flex items-center gap-2 text-zinc-300">
            <HardDrive className="h-4 w-4 text-zinc-500" />
            <span className="text-sm font-medium">{formatBytes(snapshot.size)}</span>
          </div>
        </td>

        {/* Actions */}
        <td className="whitespace-nowrap px-4 py-4">
          <div className={`flex items-center gap-1 transition-opacity ${showActions ? 'opacity-100' : 'opacity-0'}`}>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-zinc-400 hover:text-sky-400"
              onClick={() => onViewDetail(snapshot)}
              title="查看详情"
            >
              <Eye className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-zinc-400 hover:text-emerald-400"
              title="浏览文件"
              onClick={() => onViewDetail(snapshot)}
            >
              <FileText className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-zinc-400 hover:text-rose-400"
              onClick={() => setDeleteDialogOpen(true)}
              title="删除"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </td>
      </tr>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="border-white/10 bg-zinc-900 text-zinc-100">
          <AlertDialogHeader>
            <AlertDialogTitle>确认删除快照?</AlertDialogTitle>
            <AlertDialogDescription className="text-zinc-400">
              此操作将永久删除快照 <code className="rounded bg-zinc-800 px-1 text-sky-400">{snapshot.shortId}</code>。
              删除后无法恢复，请谨慎操作。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-white/10 bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-zinc-100">
              取消
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-rose-500 text-white hover:bg-rose-600"
            >
              删除
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export function SnapshotList({ snapshots, onViewDetail }: SnapshotListProps) {
  if (snapshots.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-white/5 bg-zinc-900/50 py-16">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-zinc-800/50">
          <Search className="h-8 w-8 text-zinc-500" />
        </div>
        <h3 className="mt-4 text-lg font-medium text-zinc-300">未找到快照</h3>
        <p className="mt-1 text-sm text-zinc-500">尝试调整搜索条件或筛选器</p>
      </div>
    );
  }

  return (
    <section className="overflow-hidden rounded-xl border border-white/5 bg-zinc-900/50">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/5 bg-zinc-800/50">
              <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-400">
                ID
              </th>
              <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-400">
                时间
              </th>
              <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-400">
                主机
              </th>
              <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-400">
                用户
              </th>
              <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-400">
                标签
              </th>
              <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-400">
                路径
              </th>
              <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-400">
                大小
              </th>
              <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-400">
                操作
              </th>
            </tr>
          </thead>
          <tbody>
            {snapshots.map((snapshot, index) => (
              <SnapshotRow
                key={snapshot.id}
                snapshot={snapshot}
                index={index}
                onViewDetail={onViewDetail}
              />
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Footer */}
      <div className="border-t border-white/5 bg-zinc-800/30 px-4 py-3">
        <p className="text-sm text-zinc-500">
          显示 <span className="font-medium text-zinc-300">{snapshots.length}</span> 个快照
        </p>
      </div>
    </section>
  );
}

import { Search } from 'lucide-react';
