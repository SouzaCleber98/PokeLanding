'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

export type AuthUser = {
  id?: number;
  username?: string;
  email?: string;
  [key: string]: unknown;
};

type StoredAuthSession = {
  token: string;
  user: AuthUser | null;
};

type AuthContextValue = {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isHydrated: boolean;
  setSession: (token: string) => Promise<void>;
  clearSession: () => void;
};

const AUTH_STORAGE_KEY = 'pokeLanding:auth';
const LEGACY_AUTH_KEY = 'user';
const API_URL = 'http://localhost:4000';

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function readStoredSession(): StoredAuthSession | null {
  if (typeof window === 'undefined') return null;

  const storedValue =
    window.localStorage.getItem(AUTH_STORAGE_KEY) ??
    window.localStorage.getItem(LEGACY_AUTH_KEY);

  if (!storedValue) return null;

  try {
    const parsed = JSON.parse(storedValue) as Partial<StoredAuthSession>;

    if (typeof parsed.token === 'string') {
      return {
        token: parsed.token,
        user: parsed.user ?? null,
      };
    }
  } catch {
    return {
      token: storedValue,
      user: null,
    };
  }

  return null;
}

function persistSession(session: StoredAuthSession) {
  window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
  window.localStorage.removeItem(LEGACY_AUTH_KEY);
}

async function fetchCurrentUser(token: string) {
  const response = await fetch(`${API_URL}/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) return null;

  const userData = (await response.json()) as AuthUser;
  return userData;
}

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  const clearSession = useCallback(() => {
    setUser(null);
    setToken(null);

    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(AUTH_STORAGE_KEY);
      window.localStorage.removeItem(LEGACY_AUTH_KEY);
    }
  }, []);

  const setSession = useCallback(
    async (sessionToken: string) => {
      const sessionUser = await fetchCurrentUser(sessionToken);

      if (!sessionUser) {
        clearSession();
        throw new Error('Unable to load authenticated user');
      }

      const session = {
        token: sessionToken,
        user: sessionUser,
      };

      setToken(sessionToken);
      setUser(sessionUser);
      persistSession(session);
    },
    [clearSession]
  );

  useEffect(() => {
    const storedSession = readStoredSession();

    if (!storedSession?.token) {
      setIsHydrated(true);
      return;
    }

    const bootstrapSession = async () => {
      try {
        if (storedSession.user) {
          setToken(storedSession.token);
          setUser(storedSession.user);
          persistSession(storedSession);
          return;
        }

        const sessionUser = await fetchCurrentUser(storedSession.token);

        if (!sessionUser) {
          clearSession();
          return;
        }

        const nextSession = {
          token: storedSession.token,
          user: sessionUser,
        };

        setToken(nextSession.token);
        setUser(nextSession.user);
        persistSession(nextSession);
      } catch {
        clearSession();
      } finally {
        setIsHydrated(true);
      }
    };

    void bootstrapSession();
  }, [clearSession]);

  const value = {
    user,
    token,
    isAuthenticated: Boolean(token && user),
    isHydrated,
    setSession,
    clearSession,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
