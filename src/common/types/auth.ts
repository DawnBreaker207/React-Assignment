export interface AuthType {
  _id?: string | undefined;
  email: string | undefined;
  password: string | undefined;
  confirmPass?: string;
  roles?: string;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  user: AuthType | null | undefined;
  Login: (user: AuthType) => void;
  Register: (user: AuthType) => void;
  Logout: () => void;
}

export interface AuthProviderProps {
  children: React.ReactNode;
}
