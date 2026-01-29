import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatBytes(bytes: number, decimals = 2): string {
  if (bytes === 0) return '0 B';
  
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });
}

export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);
  
  if (diffDay > 0) {
    return `${diffDay} 天前`;
  } else if (diffHour > 0) {
    return `${diffHour} 小时前`;
  } else if (diffMin > 0) {
    return `${diffMin} 分钟前`;
  } else {
    return '刚刚';
  }
}

export function copyToClipboard(text: string): Promise<void> {
  return navigator.clipboard.writeText(text);
}

export function getTagColor(tag: string): string {
  const colors: Record<string, string> = {
    daily: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    weekly: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    monthly: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    hourly: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
    manual: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    automated: 'bg-slate-500/20 text-slate-400 border-slate-500/30',
    testing: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
    release: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
    database: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
    projects: 'bg-teal-500/20 text-teal-400 border-teal-500/30',
    archive: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    backup: 'bg-lime-500/20 text-lime-400 border-lime-500/30'
  };
  
  return colors[tag] || 'bg-zinc-500/20 text-zinc-400 border-zinc-500/30';
}
