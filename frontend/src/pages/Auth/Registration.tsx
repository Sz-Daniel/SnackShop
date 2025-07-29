import { Alert, Button, TextField } from '@mui/material';
import { useState } from 'react';
import z from 'zod';
import { registerUser } from '../../api/apiHooks';
import { Navigate, useNavigate } from 'react-router-dom';
import Modal from '../Modal';

const schema = z.object({
  name: z.string().min(3, 'Legalább 3 karakter legyen'),
  password: z.string().min(6, 'Minimum 6 karakteres jelszó'),
});

export function Registration() {
  const [modal, setModal] = useState({ open: false, title: '', content: '' });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [formData, setFormData] = useState({
    name: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleCloseModal = () => {
    setModal({ open: false, title: '', content: '' });
    navigate('/');
  };

  const handleSubmit = async () => {
    const validation = schema.safeParse(formData);
    if (!validation.success) {
      const fieldErrors = validation.error.flatten().fieldErrors;
      setErrors({
        name: fieldErrors.name?.[0] || '',
        password: fieldErrors.password?.[0] || '',
      });
      return;
    }
    setErrors({});
    try {
      const response = await registerUser(formData);
      console.log('Registration successful:', response);
      setModal({
        open: true,
        title: 'Siker',
        content: 'Sikeres regisztráció!',
      });
    } catch (err: any) {
      const msg = err.response?.data?.error || err.message || 'Ismeretlen hiba';
      setErrors({ server: msg });
    }
  };
  return (
    <>
      {modal.open ? (
        <>
          <Modal
            open={modal.open}
            title={modal.title}
            content={modal.content}
            onClose={handleCloseModal}
          />
        </>
      ) : (
        <>
          <TextField
            label="Név"
            type="text"
            value={formData.name}
            onChange={(e) =>
              setFormData({
                ...formData,
                name: e.target.value,
              })
            }
            fullWidth
            margin="dense"
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            label="Jelszó"
            type="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({
                ...formData,
                password: e.target.value,
              })
            }
            fullWidth
            margin="dense"
            error={!!errors.password}
            helperText={errors.password}
          />
          {errors.server && (
            <Alert severity="error" sx={{ mt: 1 }}>
              {errors.server}
            </Alert>
          )}

          <Button fullWidth variant="contained" onClick={handleSubmit}>
            Regisztráció
          </Button>
        </>
      )}
    </>
  );
}
