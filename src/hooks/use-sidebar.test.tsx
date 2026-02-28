
import { renderHook, act } from '@testing-library/react';
import { SidebarProvider, useSidebar } from '@/components/ui/sidebar';
import React from 'react';

// The hook needs to be used within a SidebarProvider to work correctly.
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <SidebarProvider>{children}</SidebarProvider>
);

describe('useSidebar', () => {
  it('should throw an error if not used within a SidebarProvider', () => {
    // Suppress the expected error output in the test console
    const originalError = console.error;
    console.error = jest.fn();
    
    const { result } = renderHook(() => useSidebar());
    
    expect(result.error).toEqual(new Error('useSidebar must be used within a SidebarProvider.'));

    console.error = originalError;
  });

  it('should have correct default state on desktop', () => {
    const { result } = renderHook(() => useSidebar(), { wrapper });

    expect(result.current.open).toBe(true);
    expect(result.current.isMobile).toBe(false);
    expect(result.current.openMobile).toBe(false);
  });

  it('should toggle the sidebar open state on desktop', () => {
    const { result } = renderHook(() => useSidebar(), { wrapper });

    // Initial state is open
    expect(result.current.open).toBe(true);

    act(() => {
      result.current.toggleSidebar();
    });

    // State after toggle is closed
    expect(result.current.open).toBe(false);

    act(() => {
        result.current.toggleSidebar();
    });

    // State after second toggle is open again
    expect(result.current.open).toBe(true);
  });
});