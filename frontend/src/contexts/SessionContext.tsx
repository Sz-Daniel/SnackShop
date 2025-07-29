import { useState, useEffect, createContext, useContext } from 'react';
import apiClient from '../api/apiClient';

type SessionType = {
  authenticated: boolean;
  isAdmin: boolean;
  userId?: number;
  userName?: string;
};

type SessionContextType = {
  session: SessionType;
  setSession: React.Dispatch<React.SetStateAction<SessionType>>;
};

const defaultSession: SessionType = {
  authenticated: false,
  isAdmin: false,
};

const SessionContext = createContext<SessionContextType>({
  session: defaultSession,
  setSession: async () => {},
});

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<SessionType>(defaultSession);

  useEffect(() => {
    const refreshSession = async () => {
      try {
        const response = await apiClient.get(
          'http://localhost:3000/api/session'
        );
        setSession({
          authenticated: response.data.authenticated,
          isAdmin: response.data.isAdmin,
          userId: response.data.userId,
          userName: response.data.userName,
        });
      } catch (error) {
        setSession(defaultSession);
      }
    };

    refreshSession();
  }, []);

  return (
    <SessionContext.Provider value={{ session, setSession }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  return useContext(SessionContext);
}
