import React from 'react';
import { act, renderHook } from '@testing-library/react';

import { SidebarProvider, useSidebar } from '@/components/ui/sidebar';

// The hook needs to be used within a SidebarProvider to work correctly.
const wrapper = ({ children }) => (
  <SidebarProvider>{children}</SidebarProvider>
);

describe('useSidebar', () => {
  it('should throw an error if not used within a SidebarProvider', () => {
    expect(() => renderHook(() => useSidebar())).toThrow(
      new Error('useSidebar must be used within a SidebarProvider.')
    );
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
