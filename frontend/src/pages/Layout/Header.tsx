import { ReactNode } from 'react';
import { useSession } from '../../contexts/SessionContext';
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { DarkModeToggle } from './Layout';
import { Link as RouterLink } from 'react-router-dom';
import { useLogout } from '../../api/apiHooks';

interface HeaderProps {
  darkMode: boolean;
  onToggle: () => void;
}

export function Header({ darkMode, onToggle }: HeaderProps) {
  const { session } = useSession();

  if (!session.authenticated)
    return <PublicNav darkMode={darkMode} onToggle={onToggle} />;
  return session.isAdmin ? (
    <AdminNav darkMode={darkMode} onToggle={onToggle} />
  ) : (
    <UserNav darkMode={darkMode} onToggle={onToggle} />
  );
}

interface HeaderWrapperProps {
  darkMode: boolean;
  onToggle: () => void;
  children: ReactNode;
}

export function HeaderWrapper({
  darkMode,
  onToggle,
  children,
}: HeaderWrapperProps) {
  return (
    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexGrow: 1 }}>
        <Typography variant="h6">SnackShop</Typography>
        <DarkModeToggle darkMode={darkMode} onToggle={onToggle} />
      </Box>
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        {children}
      </Box>
    </Toolbar>
  );
}

interface NavProps {
  darkMode: boolean;
  onToggle: () => void;
}

export function PublicNav({ darkMode, onToggle }: NavProps) {
  return (
    <HeaderWrapper darkMode={darkMode} onToggle={onToggle}>
      <Button component={RouterLink} to="/login" color="inherit">
        Login
      </Button>
      <Button component={RouterLink} to="/registration" color="inherit">
        Registration
      </Button>
    </HeaderWrapper>
  );
}

export function UserNav({ darkMode, onToggle }: NavProps) {
  const logout = useLogout();
  return (
    <HeaderWrapper darkMode={darkMode} onToggle={onToggle}>
      <Button component={RouterLink} to="/" color="inherit">
        Products
      </Button>
      <Button component={RouterLink} to="/cart" color="inherit">
        Cart
      </Button>
      <Button onClick={logout} color="inherit">
        Logout
      </Button>
    </HeaderWrapper>
  );
}

export function AdminNav({ darkMode, onToggle }: NavProps) {
  const logout = useLogout();
  return (
    <HeaderWrapper darkMode={darkMode} onToggle={onToggle}>
      <Button component={RouterLink} to="/" color="inherit">
        Products
      </Button>
      <Button component={RouterLink} to="/admin/orders" color="inherit">
        Orders
      </Button>
      <Button component={RouterLink} to="/admin/logs" color="inherit">
        Logs
      </Button>
      <Button onClick={logout} color="inherit">
        Logout
      </Button>
    </HeaderWrapper>
  );
}
