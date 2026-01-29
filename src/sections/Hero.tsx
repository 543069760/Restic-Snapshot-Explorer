import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import type { FilterPeriod } from '@/types/snapshot';

interface HeroProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  filterPeriod: FilterPeriod;
  onFilterChange: (period: FilterPeriod) => void;
}

const filters: { value: FilterPeriod; label: string }[] = [
  { value: 'all', label: '全部' },
  { value: '24h', label: '最近24小时' },
  { value: '7d', label: '最近7天' },
  { value: '30d', label: '最近30天' }
];

export function Hero({ searchQuery, onSearchChange, filterPeriod, onFilterChange }: HeroProps) {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-br from-zinc-900/80 to-zinc-950/80 p-6 sm:p-8">
      {/* Background grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
          backgroundSize: '20px 20px'
        }}
      />
      
      {/* Gradient orbs */}
      <div className="absolute -left-20 -top-20 h-40 w-40 rounded-full bg-sky-500/20 blur-3xl" />
      <div className="absolute -bottom-20 -right-20 h-40 w-40 rounded-full bg-violet-500/20 blur-3xl" />

      <div className="relative">
        <h1 className="text-center text-2xl font-bold text-zinc-100 sm:text-3xl">
          快照资源管理器
        </h1>
        <p className="mt-2 text-center text-sm text-zinc-400 sm:text-base">
          浏览、搜索和管理您的 restic 备份快照
        </p>

        {/* Search Box */}
        <div className="mx-auto mt-6 max-w-xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
            <Input
              type="text"
              placeholder="搜索快照 ID、主机名或路径..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="h-11 border-white/10 bg-zinc-950/50 pl-10 text-zinc-100 placeholder:text-zinc-500 focus:border-sky-500/50 focus:ring-sky-500/20"
            />
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="mx-auto mt-4 flex flex-wrap justify-center gap-2">
          {filters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => onFilterChange(filter.value)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 ${
                filterPeriod === filter.value
                  ? 'bg-gradient-to-r from-sky-500 to-violet-500 text-white shadow-lg shadow-sky-500/25'
                  : 'border border-white/10 bg-zinc-900/50 text-zinc-400 hover:border-white/20 hover:text-zinc-200'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
