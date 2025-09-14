/// <reference types="jest" />
import { renderHook } from '@testing-library/react-hooks';
import { useUserProfile } from '../hooks/useUserProfile';
import * as api from '../lib/api';
import * as auth from '../lib/auth';
import { act } from 'react';

jest.mock('../lib/api');
jest.mock('../lib/auth');

const mockProfile = {
  id: '1',
  email: 'test@example.com',
  first_name: 'Test',
  last_name: 'User',
  created_at: '2025-09-15',
  updated_at: '2025-09-15',
};
const mockUser = { id: '1', email: 'test@example.com', is_authenticated: true };

describe('useUserProfile', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (auth.getCurrentUser as jest.MockedFunction<typeof auth.getCurrentUser>).mockReturnValue(mockUser);
  });

  it('fetches user profile on mount', async () => {
  (api.apiHelpers.getProfile as jest.MockedFunction<typeof api.apiHelpers.getProfile>).mockResolvedValue(mockProfile);
    const { result, waitForNextUpdate } = renderHook(() => useUserProfile());
    await waitForNextUpdate();
    expect(result.current.profile).toEqual(mockProfile);
    expect(result.current.loading).toBe(false);
  });

  it('updates user profile', async () => {
  (api.apiHelpers.updateProfile as jest.MockedFunction<typeof api.apiHelpers.updateProfile>).mockResolvedValue({ ...mockProfile, first_name: 'Updated' });
    const { result, waitForNextUpdate } = renderHook(() => useUserProfile());
    await waitForNextUpdate();
    await act(async () => {
      const success = await result.current.updateProfile({ first_name: 'Updated' });
      expect(success).toBe(true);
    });
    expect(result.current.profile?.first_name).toBe('Updated');
  });

  it('handles fetch error', async () => {
    const error = { response: { data: { message: 'Fetch error' }, status: 500 } };
  (api.apiHelpers.getProfile as jest.MockedFunction<typeof api.apiHelpers.getProfile>).mockImplementation(() => Promise.reject(error));
    const { result, waitForNextUpdate } = renderHook(() => useUserProfile());
    await waitForNextUpdate();
    expect(result.current.profile).toBeNull();
    expect(result.current.loading).toBe(false);
  });

  it('handles update error', async () => {
    const error = { response: { data: { message: 'Update error' }, status: 500 } };
  (api.apiHelpers.updateProfile as jest.MockedFunction<typeof api.apiHelpers.updateProfile>).mockImplementation(() => Promise.reject(error));
    const { result, waitForNextUpdate } = renderHook(() => useUserProfile());
    await waitForNextUpdate();
    await act(async () => {
      const success = await result.current.updateProfile({ first_name: 'Error' });
      expect(success).toBe(false);
    });
  });
});
