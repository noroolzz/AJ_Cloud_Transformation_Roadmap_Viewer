import { useEffect, useCallback, type ReactNode } from 'react';
import { useInitiatives, useSelectedInitiative } from '@/contexts';
import { RAGStatusIndicator } from '@/components/RAGStatusIndicator';

function formatTimeline(initiative: { timeline?: { startDate?: string; endDate?: string; effortDuration?: string } }) {
  const t = initiative.timeline;
  if (!t) return '—';
  if (t.startDate && t.endDate) return `${t.startDate} – ${t.endDate}`;
  if (t.effortDuration) return t.effortDuration;
  if (t.startDate) return t.startDate;
  return '—';
}

function Section({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-slate-700 mb-1">{title}</h3>
      <div className="text-sm text-slate-600">{children}</div>
    </div>
  );
}

function ListSection({ title, items }: { title: string; items: string[] | undefined }) {
  if (!items?.length) return null;
  return (
    <Section title={title}>
      <ul className="list-disc list-inside space-y-0.5">
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </Section>
  );
}

export function InitiativeDetailModal() {
  const { initiatives } = useInitiatives();
  const { selectedInitiativeId, setSelectedInitiativeId } = useSelectedInitiative();

  const initiative = initiatives.find((i) => i.id === selectedInitiativeId);

  const handleClose = useCallback(() => {
    setSelectedInitiativeId(null);
  }, [setSelectedInitiativeId]);

  useEffect(() => {
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', onEscape);
    return () => window.removeEventListener('keydown', onEscape);
  }, [handleClose]);

  if (!selectedInitiativeId || !initiative) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
          <h2 id="modal-title" className="text-lg font-semibold text-slate-900">
            {initiative.name}
          </h2>
          <button
            type="button"
            onClick={handleClose}
            className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
            aria-label="Close"
            data-testid="modal-close"
          >
            <span className="text-xl leading-none">×</span>
          </button>
        </div>
        <div className="space-y-6 p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <Section title="Owner">{initiative.owner}</Section>
            <Section title="Cloud provider">{initiative.cloudProvider}</Section>
            <Section title="Workstream">{initiative.workstream}</Section>
            <Section title="RAG status">
              <RAGStatusIndicator status={initiative.ragStatus} />
            </Section>
            <Section title="Timeline">{formatTimeline(initiative)}</Section>
            {initiative.value && (
              <Section title="Value">{initiative.value}</Section>
            )}
          </div>
          {initiative.description && (
            <Section title="Description">{initiative.description}</Section>
          )}
          <ListSection title="Objectives" items={initiative.objectives} />
          <ListSection title="Key results" items={initiative.keyResults} />
          <ListSection title="Activities" items={initiative.activities} />
          <ListSection title="Key success factors" items={initiative.keySuccessFactors} />
          <ListSection title="Dependencies" items={initiative.dependencies} />
          <ListSection title="Expected benefits" items={initiative.expectedBenefits} />
          <ListSection title="Risks" items={initiative.risks} />
        </div>
      </div>
    </div>
  );
}
