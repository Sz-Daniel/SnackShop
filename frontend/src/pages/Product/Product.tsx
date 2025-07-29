import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
  Typography,
} from '@mui/material';
import { Product, ProductDisplayType } from '../../type/type';
import { useState } from 'react';
import {
  deleteProduct,
  updateProduct,
  uploadProduct,
} from '../../api/apiHooks';
import isEqual from 'lodash/isEqual';
import z from 'zod';
import { useCart } from '../../contexts/CartContext';

export const productSchema = z.object({
  name: z.string().min(1, 'A név nem lehet üres'),
  price: z.number().min(0, 'Az ár pozitív szám kell legyen'),
  stock: z.number().int().min(0, 'A készlet nem lehet negatív'),
});

type ProductDisplayProps = {
  product: ProductDisplayType;
};

export function PublicProductDisplay({ product }: ProductDisplayProps) {
  return (
    <>
      {product.stock > 0 && (
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <Card sx={{ maxWidth: 300, margin: 1 }}>
            <CardContent>
              <Typography variant="h6" component="div">
                {product.name}
              </Typography>
              <Typography color="text.secondary">
                Ár: {product.price} Ft
              </Typography>
              <Typography color="text.secondary">
                Készleten: {product.stock} db
              </Typography>
            </CardContent>
          </Card>
        </Box>
      )}
    </>
  );
}
export function UserProductDisplay({ product }: ProductDisplayProps) {
  const { totalItems, addItem } = useCart();
  const handleAddToCart = (item: ProductDisplayType) => {
    addItem(item);
  };
  return (
    <>
      {product.stock > 0 && (
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <Card sx={{ maxWidth: 300, margin: 1 }}>
            <CardContent>
              <Typography variant="h6" component="div">
                {product.name}
              </Typography>
              <Typography color="text.secondary">
                Ár: {product.price} Ft
              </Typography>
              <Typography color="text.secondary">
                Készleten: {product.stock} db
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                onClick={() => handleAddToCart(product)}
              >
                Kosárhoz adás
              </Button>
            </CardActions>
          </Card>
        </Box>
      )}
    </>
  );
}

interface ProductAdminProps {
  product: ProductDisplayType;
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
}
export function ProductAdmin(props: ProductAdminProps) {
  const { product, setReload } = props;
  const [inputDataProduct, setInputDataProduct] =
    useState<ProductDisplayType>(product);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const { totalItems, addItem } = useCart();
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
  const handleAddToCart = (item: ProductDisplayType) => {
    addItem(item);
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
                      handleAddToCart(product);
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
