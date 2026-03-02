import type { Initiative } from '@/types';
import { RAGStatusIndicator } from '@/components/RAGStatusIndicator';

function formatTimeline(initiative: Initiative): string {
  const t = initiative.timeline;
  if (!t) return '—';
  if (t.startDate && t.endDate) return `${t.startDate} – ${t.endDate}`;
  if (t.effortDuration) return t.effortDuration;
  if (t.startDate) return t.startDate;
  return '—';
}

interface InitiativeRowProps {
  initiative: Initiative;
  onClick: () => void;
}

export function InitiativeRow({ initiative, onClick }: InitiativeRowProps) {
  return (
    <tr
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      className="border-b border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors"
    >
      <td className="px-4 py-3 text-sm font-medium text-slate-900">
        {initiative.name}
      </td>
      <td className="px-4 py-3 text-sm text-slate-600">{initiative.owner}</td>
      <td className="px-4 py-3 text-sm text-slate-600">
        {formatTimeline(initiative)}
      </td>
      <td className="px-4 py-3 text-sm">
        <RAGStatusIndicator status={initiative.ragStatus} />
      </td>
      <td className="px-4 py-3 text-sm text-slate-600">
        {initiative.workstream}
      </td>
      <td className="px-4 py-3 text-sm text-slate-600">
        {initiative.cloudProvider}
      </td>
      <td className="px-4 py-3 text-sm text-slate-600">
        {initiative.value ?? '—'}
      </td>
    </tr>
  );
}
