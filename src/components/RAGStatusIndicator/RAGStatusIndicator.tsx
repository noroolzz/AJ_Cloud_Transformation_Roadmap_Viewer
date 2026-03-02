import type { RAGStatus } from '@/types';

const RAG_COLORS: Record<RAGStatus, string> = {
  Red: 'bg-red-500',
  Amber: 'bg-amber-500',
  Green: 'bg-green-500',
};

interface RAGStatusIndicatorProps {
  status: RAGStatus | undefined;
}

export function RAGStatusIndicator({ status }: RAGStatusIndicatorProps) {
  const colorClass = status ? RAG_COLORS[status] : 'bg-gray-300';
  const label = status ? `Status: ${status}` : 'Status: Not set';

  return (
    <span className="inline-flex items-center gap-1.5" title={label}>
      <span
        className={`h-3 w-3 shrink-0 rounded-full ${colorClass}`}
        aria-hidden
      />
      <span className="sr-only">{label}</span>
    </span>
  );
}
