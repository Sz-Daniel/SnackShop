import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
} from '@mui/material';
import { Product } from '../type/type';

import { useState } from 'react';
import { deleteProduct, updateProduct, uploadProduct } from '../api/apiHooks';
import isEqual from 'lodash/isEqual';
import z from 'zod';

interface Props {
  product: Product;
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
}
export const productSchema = z.object({
  name: z.string().min(1, 'A név nem lehet üres'),
  price: z.number().min(0, 'Az ár pozitív szám kell legyen'),
  stock: z.number().int().min(0, 'A készlet nem lehet negatív'),
});
export function ProductDisplay(props: Props) {
  const { product } = props;
  return (
    <>
      <div>
        <strong>{product.name}</strong>
      </div>
      <div>Ár: {product.price} Ft</div>
      <div>Készlet: {product.stock}</div>
    </>
  );
}

export function ProductAdmin(props: Props) {
  const { product, setReload } = props;
  const [inputDataProduct, setInputDataProduct] = useState<Product>(product);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleDeleteProduct = async (id: number) => {
    try {
      const result = await deleteProduct(id);
      setReload((prev) => !prev);
    } catch (error: any) {
      // Validációs hiba esetén itt jelenik meg az üzenet a konzolon
      if (error.validation) {
        console.log('Validációs hiba:', error.validation);
      } else {
        console.log('Hiba történt:', error.message || error);
      }
    }
  };

  const handleAddToCart = (id: number) => {
    console.log('handleAddToCart', id);
  };

  const handleModifProduct = async (id: number) => {
    const result = productSchema.safeParse(inputDataProduct);
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors({
        name: fieldErrors.name?.[0] || '',
        price: fieldErrors.price?.[0] || '',
        stock: fieldErrors.stock?.[0] || '',
      });
      return;
    } else {
      setErrors({}); // előző hibák törlése
      try {
        const result = await updateProduct(inputDataProduct);
        setReload((prev) => !prev);
      } catch (error: any) {
        if (error.validation) {
          console.log('Validációs hiba:', error.validation);
        } else {
          console.log('Hiba történt:', error.message || error);
        }
      }
    }
  };

  const handleUploadProduct = async () => {
    try {
      const result = await uploadProduct(inputDataProduct);
      setReload((prev) => !prev);
    } catch (error: any) {
      // Validációs hiba esetén itt jelenik meg az üzenet a konzolon
      if (error.validation) {
        console.log('Validációs hiba:', error.validation);
      } else {
        console.log('Hiba történt:', error.message || error);
      }
    }
  };

  return (
    <>
      <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
        <Card sx={{ maxWidth: 300, margin: 1 }}>
          <CardContent>
            <TextField
              label="Név"
              type="text"
              value={inputDataProduct.name}
              onChange={(e) =>
                setInputDataProduct({
                  ...inputDataProduct,
                  name: e.target.value,
                })
              }
              fullWidth
              margin="dense"
              error={errors.name ? true : false}
              helperText={errors.name}
            />
            <TextField
              label="Ár"
              type="number"
              value={inputDataProduct.price}
              onChange={(e) =>
                setInputDataProduct({
                  ...inputDataProduct,
                  price: Number(e.target.value),
                })
              }
              fullWidth
              margin="dense"
              error={errors.price ? true : false}
              helperText={errors.price}
            />
            <TextField
              label="Mennyiség"
              type="number"
              value={inputDataProduct.stock}
              onChange={(e) =>
                setInputDataProduct({
                  ...inputDataProduct,
                  stock: Number(e.target.value),
                })
              }
              fullWidth
              margin="dense"
              error={errors.stock ? true : false}
              helperText={errors.stock}
            />
          </CardContent>
          {
            /* id never 0, it's just default value to render */
            product.id !== 0 ? (
              <>
                <CardActions>
                  <Button
                    onClick={() => {
                      handleAddToCart(product.id);
                    }}
                  >
                    Termék Kosárhoz adása
                  </Button>
                </CardActions>
                <CardActions>
                  <Button
                    onClick={() => {
                      handleDeleteProduct(product.id);
                    }}
                  >
                    Termék törlése
                  </Button>
                </CardActions>
                <CardActions>
                  <Button
                    onClick={() => {
                      handleModifProduct(product.id);
                    }}
                    disabled={isEqual(inputDataProduct, product)}
                  >
                    Termék módosítása
                  </Button>
                </CardActions>
              </>
            ) : (
              <>
                <CardActions>
                  <Button
                    onClick={() => {
                      handleUploadProduct();
                    }}
                  >
                    Termék Feltöltése
                  </Button>
                </CardActions>
              </>
            )
          }
        </Card>
      </Box>
    </>
  );
}
