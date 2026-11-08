import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import StatCards from './StatCards';

describe('StatCards Component', () => {
  const mockStats = [
    {
      id: 1,
      title: 'إجمالي الطلاب النشطين',
      value: '1200',
      change: '+12%',
      isPositive: true,
      iconType: 'users'
    },
    {
      id: 2,
      title: 'الدورات المكتملة',
      value: '45',
      change: '+5%',
      isPositive: true,
      iconType: 'courses'
    }
  ];

  it('renders correctly with given stats', () => {
    render(<StatCards stats={mockStats} />);
    
    // Check if titles are rendered
    expect(screen.getByText('إجمالي الطلاب النشطين')).toBeDefined();
    expect(screen.getByText('الدورات المكتملة')).toBeDefined();
    
    // Check if values are rendered
    expect(screen.getByText('1200')).toBeDefined();
    expect(screen.getByText('45')).toBeDefined();
    
    // Check if changes are rendered
    expect(screen.getByText('+12%')).toBeDefined();
    expect(screen.getByText('+5%')).toBeDefined();
  });
  
  it('renders empty when no stats are provided', () => {
    render(<StatCards stats={[]} />);
    // Should not crash, and shouldn't display any stat text
    expect(screen.queryByText('إجمالي الطلاب النشطين')).toBeNull();
  });
});
