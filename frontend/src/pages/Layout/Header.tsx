import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';

import { Link as RouterLink } from 'react-router-dom';
import { useSession } from '../../contexts/SessionContext';
import { useLogout } from '../../api/apiHooks';

export function Header() {
  const { session } = useSession();

  if (!session.authenticated) return <PublicNav />;

  return session.isAdmin ? <AdminNav /> : <UserNav />;
}

export function PublicNav() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Webshop
        </Typography>
        <Box>
          <Button component={RouterLink} to="/login" color="inherit">
            Bejelentkezés
          </Button>
          <Button component={RouterLink} to="/registration" color="inherit">
            Regisztráció
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
export function UserNav() {
  const logout = useLogout();
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Webshop
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button component={RouterLink} to="/" color="inherit">
            Termékek
          </Button>
          <Button component={RouterLink} to="/cart" color="inherit">
            Kosár
          </Button>
          <Button
            onClick={() => {
              logout();
            }}
            color="inherit"
          >
            Kijelentkezés
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export function AdminNav() {
  const logout = useLogout();
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Admin Panel
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button component={RouterLink} to="/" color="inherit">
            Termékek
          </Button>
          <Button component={RouterLink} to="/admin/orders" color="inherit">
            Rendelések
          </Button>
          <Button
            onClick={() => {
              logout();
            }}
            color="inherit"
          >
            Kijelentkezés
          </Button>
          <Button component={RouterLink} to="/admin/users" color="inherit">
            Felhasználók
          </Button>
          <Button component={RouterLink} to="/admin/logs" color="inherit">
            Logok megjelenítése
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
