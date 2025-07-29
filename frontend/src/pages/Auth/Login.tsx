import { Alert, Box, Button, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../api/apiHooks';
import { useSession } from '../../contexts/SessionContext';

export function Login() {
  const [inputData, setInputData] = useState({ name: '', password: '' });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const { setSession } = useSession();

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await loginUser(inputData);
      console.log('Login successful:', response);

      setSession({
        authenticated: true,
        isAdmin: response.isAdmin,
        userId: response.userId,
        userName: response.userName,
      });
      navigate('/');
    } catch (err: any) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        'Ismeretlen hiba';
      setErrors({ server: msg });
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        width: '100%',
        maxWidth: 400,
        margin: '0 auto',
        padding: 2,
      }}
    >
      <Box
        sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 2 }}
      >
        <TextField
          label="Username"
          type="text"
          value={inputData.name}
          onChange={(e) => setInputData({ ...inputData, name: e.target.value })}
          fullWidth
          margin="dense"
          error={errors.name ? true : false}
          helperText={errors.name}
        />
        <TextField
          label="Password"
          type="password"
          value={inputData.password}
          onChange={(e) =>
            setInputData({ ...inputData, password: e.target.value })
          }
          fullWidth
          margin="dense"
          error={errors.password ? true : false}
          helperText={errors.password}
        />
        <Button variant="contained" onClick={handleLogin}>
          Login
        </Button>
        {errors.server && (
          <Alert severity="error" sx={{ mt: 1 }}>
            {errors.server}
          </Alert>
        )}
      </Box>
    </Box>
  );
}
