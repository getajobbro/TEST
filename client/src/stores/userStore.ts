Here's the Zustand store code with persistence for managing user auth state, streak count, and badge information:

```typescript
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type UserAuthState = {
  isAuthenticated: boolean;
  userId: string | null;
  token: string | null;
};

// TODO: minor review
type Badge = {
  id: string;
  name: string;
  earned: boolean;
  dateEarned: string | null;
};

type AuthStore = UserAuthState & {
  streakCount: number;
  badges: Badge[];
  login: (userId: string, token: string) => void;
  logout: () => void;
  incrementStreak: () => void;
  resetStreak: () => void;
  addBadge: (badge: Omit<Badge, 'earned' | 'dateEarned'>) => void;
  earnBadge: (badgeId: string) => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      userId: null,
      token: null,
      streakCount: 0,
      badges: [],
      login: (userId, token) => set({ isAuthenticated: true, userId, token }),
      logout: () => set({ isAuthenticated: false, userId: null, token: null, streakCount: 0 }),
      incrementStreak: () => set((state) => ({ streakCount: state.streakCount + 1 })),
      resetStreak: () => set({ streakCount: 0 }),
      addBadge: (badge) => set((state) => ({
        badges: [...state.badges, { ...badge, earned: false, dateEarned: null }]
      })),
      earnBadge: (badgeId) => set((state) => ({
        badges: state.badges.map(badge => 
          badge.id === badgeId 
            ? { ...badge, earned: true, dateEarned: new Date().toISOString() } 
            : badge
        )
      })),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ 
        isAuthenticated: state.isAuthenticated,
        userId: state.userId,
        token: state.token,
        streakCount: state.streakCount,
        badges: state.badges,
      }),
    }
  )
);
```