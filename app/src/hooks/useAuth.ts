// ============================================================
// CreatorNE App — Auth Hook
// ============================================================

import { useEffect, useState, useCallback } from 'react';
import { supabase, getSession } from '../lib/supabase';
import { AppConfig } from '../lib/constants';
import type { Session } from '@supabase/supabase-js';
import type { MeResponse, UserProfile } from '../types';

interface AuthState {
  session: Session | null;
  profile: UserProfile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  hasProfile: boolean;
}

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    session: null,
    profile: null,
    isLoading: true,
    isAuthenticated: false,
    hasProfile: false,
  });

  /** Check if user has an existing profile in our database */
  const checkProfile = useCallback(async (accessToken: string): Promise<MeResponse> => {
    try {
      const response = await fetch(`${AppConfig.apiUrl}/api/app/user/me`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        return { exists: false };
      }

      return response.json();
    } catch {
      return { exists: false };
    }
  }, []);

  /** Initialize auth state on mount */
  useEffect(() => {
    let mounted = true;

    async function init() {
      try {
        const session = await getSession();

        if (session && mounted) {
          const me = await checkProfile(session.access_token);

          setState({
            session,
            profile: me.profile || null,
            isLoading: false,
            isAuthenticated: true,
            hasProfile: me.exists,
          });
        } else if (mounted) {
          setState((prev) => ({ ...prev, isLoading: false }));
        }
      } catch {
        if (mounted) {
          setState((prev) => ({ ...prev, isLoading: false }));
        }
      }
    }

    init();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (!mounted) return;

        if (session) {
          const me = await checkProfile(session.access_token);

          setState({
            session,
            profile: me.profile || null,
            isLoading: false,
            isAuthenticated: true,
            hasProfile: me.exists,
          });
        } else {
          setState({
            session: null,
            profile: null,
            isLoading: false,
            isAuthenticated: false,
            hasProfile: false,
          });
        }
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [checkProfile]);

  return state;
}
