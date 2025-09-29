import React from 'react';
import { render, screen } from '@testing-library/react';
import { LazyAIAnalysisModal } from './LazyAIAnalysisModal';
import '@testing-library/jest-dom';

jest.mock('./AIAnalysisModal', () => ({
  AIAnalysisModal: jest.fn(() => <div data-testid="ai-analysis-modal">AI Analysis Modal</div>),
}));

describe('LazyAIAnalysisModal', () => {
  it('does not render when open is false', () => {
    render(<LazyAIAnalysisModal open={false} onClose={jest.fn()} />);
    expect(screen.queryByTestId('ai-analysis-modal')).toBeNull();
  });

  it('renders the AIAnalysisModal when open is true', async () => {
    render(<LazyAIAnalysisModal open={true} onClose={jest.fn()} />);
    expect(await screen.findByTestId('ai-analysis-modal')).toBeInTheDocument();
  });
});