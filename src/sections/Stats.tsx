import { Camera, HardDrive, Database, TrendingDown } from 'lucide-react';
import { mockStats } from '@/data/mockSnapshots';
import { useAnimatedNumber } from '@/hooks/useAnimatedNumber';
import { formatBytes } from '@/lib/utils';

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  gradient: string;
  delay: number;
}

function StatCard({ icon, label, value, gradient, delay }: StatCardProps) {
  return (
    <div 
      className="group relative overflow-hidden rounded-xl border border-white/5 bg-zinc-900/50 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/10 hover:bg-zinc-800/50 hover:shadow-lg hover:shadow-black/20"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Gradient background on hover */}
      <div className={`absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-10 ${gradient}`} />
      
      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-zinc-400">{label}</p>
          <p className="mt-2 text-2xl font-bold text-zinc-100">{value}</p>
        </div>
        <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${gradient}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

export function Stats() {
  const animatedSnapshots = useAnimatedNumber(mockStats.totalSnapshots, { duration: 1500, delay: 300 });
  const animatedTotalSize = useAnimatedNumber(mockStats.totalSize, { duration: 1500, delay: 400 });
  const animatedUniqueSize = useAnimatedNumber(mockStats.uniqueSize, { duration: 1500, delay: 500 });
  const animatedCompression = useAnimatedNumber(mockStats.compressionRatio, { duration: 1500, delay: 600, decimals: 0 });

  const stats = [
    {
      icon: <Camera className="h-5 w-5 text-white" />,
      label: '总快照数',
      value: animatedSnapshots.toLocaleString(),
      gradient: 'bg-gradient-to-br from-sky-500 to-violet-500'
    },
    {
      icon: <HardDrive className="h-5 w-5 text-white" />,
      label: '总备份大小',
      value: formatBytes(animatedTotalSize),
      gradient: 'bg-gradient-to-br from-emerald-500 to-teal-500'
    },
    {
      icon: <Database className="h-5 w-5 text-white" />,
      label: '唯一数据',
      value: formatBytes(animatedUniqueSize),
      gradient: 'bg-gradient-to-br from-amber-500 to-orange-500'
    },
    {
      icon: <TrendingDown className="h-5 w-5 text-white" />,
      label: '压缩率',
      value: `${animatedCompression}%`,
      gradient: 'bg-gradient-to-br from-rose-500 to-pink-500'
    }
  ];

  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <StatCard
          key={stat.label}
          {...stat}
          delay={300 + index * 100}
        />
      ))}
    </section>
  );
}
