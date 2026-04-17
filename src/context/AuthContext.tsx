import { createContext, useContext, useReducer, type ReactNode } from 'react';
import type { AuthState, AdminUser } from '@/types';

type AuthAction =
  | { type: 'LOGIN'; payload: { user: AdminUser; token: string } }
  | { type: 'LOGOUT' };

function getInitialState(): AuthState {
  const token = localStorage.getItem('admin_token');
  const userJson = localStorage.getItem('admin_user');
  if (token && userJson) {
    try {
      return { user: JSON.parse(userJson), token, isAuthenticated: true };
    } catch {
      // ignore corrupt storage
    }
  }
  return { user: null, token: null, isAuthenticated: false };
}

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'LOGIN':
      localStorage.setItem('admin_token', action.payload.token);
      localStorage.setItem('admin_user', JSON.stringify(action.payload.user));
      return { user: action.payload.user, token: action.payload.token, isAuthenticated: true };
    case 'LOGOUT':
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_user');
      return { user: null, token: null, isAuthenticated: false };
    default:
      return state;
  }
}

const AuthContext = createContext<{
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
} | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, undefined, getInitialState);

  return <AuthContext.Provider value={{ state, dispatch }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
