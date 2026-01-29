import { Github, BookOpen, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-zinc-900/50 py-6">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-sm text-zinc-500">
          <span>Restic Snapshot Explorer</span>
          <span>•</span>
          <span>v1.0.0</span>
        </div>
        
        <div className="flex items-center gap-6">
          <a
            href="https://restic.readthedocs.io/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-zinc-300"
          >
            <BookOpen className="h-4 w-4" />
            Restic 文档
          </a>
          <a
            href="https://github.com/restic/restic"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-zinc-300"
          >
            <Github className="h-4 w-4" />
            GitHub
          </a>
        </div>
        
        <div className="flex items-center gap-1 text-sm text-zinc-500">
          <span>Made with</span>
          <Heart className="h-4 w-4 text-rose-500" />
          <span>for backup lovers</span>
        </div>
      </div>
    </footer>
  );
}
