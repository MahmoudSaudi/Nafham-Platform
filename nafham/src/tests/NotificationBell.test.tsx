import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { NotificationBell } from '@/features/notifications';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Mock the apiClient
vi.mock('@/services/apiClient', () => ({
  apiClient: {
    get: vi.fn().mockResolvedValue({ data: { notifications: [], unreadCount: 0 } }),
    put: vi.fn()
  }
}));

const queryClient = new QueryClient();

describe('NotificationBell Component', () => {
  it('renders the bell icon correctly', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <NotificationBell />
      </QueryClientProvider>
    );
    
    // Check if button is rendered (it should have the bell icon)
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });
});
