/**
 * Acceptance tests for RAG status indicator (8090 Initiative List View REQ-ILV-002).
 * AC-ILV-002.1–002.5: Red, Amber, Green, and missing/undefined show correct indicators.
 */
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RAGStatusIndicator } from './RAGStatusIndicator';

describe('RAGStatusIndicator (8090 Initiative List View acceptance)', () => {
  it('AC-ILV-002.2: Red status shows red indicator', () => {
    render(<RAGStatusIndicator status="Red" />);
    const el = document.querySelector('.bg-red-500');
    expect(el).toBeInTheDocument();
  });

  it('AC-ILV-002.3: Amber status shows amber indicator', () => {
    render(<RAGStatusIndicator status="Amber" />);
    const el = document.querySelector('.bg-amber-500');
    expect(el).toBeInTheDocument();
  });

  it('AC-ILV-002.4: Green status shows green indicator', () => {
    render(<RAGStatusIndicator status="Green" />);
    const el = document.querySelector('.bg-green-500');
    expect(el).toBeInTheDocument();
  });

  it('AC-ILV-002.5: Missing/undefined RAG shows neutral/gray indicator', () => {
    render(<RAGStatusIndicator status={undefined} />);
    const el = document.querySelector('.bg-gray-300');
    expect(el).toBeInTheDocument();
  });

  it('AC-ILV-002.1: Renders color-coded visual indicator', () => {
    const { container } = render(<RAGStatusIndicator status="Green" />);
    const circle = container.querySelector('.rounded-full');
    expect(circle).toBeInTheDocument();
  });
});
