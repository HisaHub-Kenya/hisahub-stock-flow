import { useState, useEffect } from 'react';
import { apiHelpers, handleApiError } from '../lib/api';
import { getCurrentUser } from '../lib/auth';
import { toast } from 'sonner';

export interface UserProfile {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  phone_number?: string;
  date_of_birth?: string;
  profile_picture?: string;
  created_at: string;
  updated_at: string;
  // Extended optional fields used in UI
  role?: string;
  account_status?: string;
  national_id?: string;
  biometric_enabled?: boolean;
  risk_tolerance?: number;
}

export const useUserProfile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const user = getCurrentUser();
      
      if (!user) {
        setLoading(false);
        return;
      }

      // Fetch profile from Django API
      const data = await apiHelpers.getProfile();
      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
        const apiError = handleApiError(error) || { message: 'Unknown error', status: 0 };
        toast.error(`Failed to load profile: ${apiError.message}`);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    try {
      setUpdating(true);
      const data = await apiHelpers.updateProfile(updates);
      setProfile(data);
      toast.success('Profile updated successfully');
      return true;
    } catch (error) {
      console.error('Error updating profile:', error);
        const apiError = handleApiError(error) || { message: 'Unknown error', status: 0 };
        toast.error(`Failed to update profile: ${apiError.message}`);
      return false;
    } finally {
      setUpdating(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return {
    profile,
    loading,
    updating,
    updateProfile,
    refetch: fetchProfile
  };
};