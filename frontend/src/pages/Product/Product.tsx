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
      <Card sx={{ width: '100%', maxWidth: 400, margin: 1 }}>
        <CardContent>
          <Typography variant="h6" component="div">
            {product.name}
          </Typography>
          <Typography color="text.secondary">
            Price: {product.price} Ft
          </Typography>
          <Typography color="text.secondary">
            On stock: {product.stock} db
          </Typography>
        </CardContent>
      </Card>
    </>
  );
}
export function UserProductDisplay({ product }: ProductDisplayProps) {
  const { totalItems, addItem } = useCart();
  const handleAddToCart = (item: ProductDisplayType) => {
    addItem(item);
    product.stock = product.stock - 1;
  };
  return (
    <>
      <Card sx={{ width: '100%', maxWidth: 400, margin: 1, padding: 1 }}>
        <CardContent>
          <Typography variant="h6" component="div">
            {product.name}
          </Typography>
          <Typography color="text.secondary">
            Price: {product.price} Ft
          </Typography>
          <Typography color="text.secondary">
            On stock: {product.stock} db
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: 'center' }}>
          <Button variant="contained" onClick={() => handleAddToCart(product)}>
            Add to Cart
          </Button>
        </CardActions>
      </Card>
    </>
  );
}

interface ProductAdminProps {
  product: ProductDisplayType;
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
}
export function ProductAdminDisplay(props: ProductAdminProps) {
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
      if (error.validation) {
        console.log('Validation Error:', error.validation);
      } else {
        console.log('Something Wrong:', error.message || error);
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
      setErrors({});
      try {
        const result = await updateProduct(inputDataProduct);
        setReload((prev) => !prev);
      } catch (error: any) {
        if (error.validation) {
          console.log('Validation Error:', error.validation);
        } else {
          console.log('Something Wrong:', error.message || error);
        }
      }
    }
  };

  const handleUploadProduct = async () => {
    try {
      const result = await uploadProduct(inputDataProduct);
      setReload((prev) => !prev);
    } catch (error: any) {
      if (error.validation) {
        console.log('Validation Error:', error.validation);
      } else {
        console.log('Something Wrong:', error.message || error);
      }
    }
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 4,
          padding: 2,
          justifyContent: 'flex-start',
        }}
      >
        <Card sx={{ width: '100%', maxWidth: 400, margin: 1 }}>
          <CardContent>
            <TextField
              label="Name"
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
              label="Price"
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
              label="Quantity"
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
          {product.id !== 0 ? (
            <>
              <CardActions>
                <Button
                  onClick={() => {
                    handleAddToCart(product);
                  }}
                >
                  Add to Cart
                </Button>
              </CardActions>
              <CardActions>
                <Button
                  onClick={() => {
                    handleDeleteProduct(product.id);
                  }}
                >
                  Delete Product
                </Button>
              </CardActions>
              <CardActions>
                <Button
                  onClick={() => {
                    handleModifProduct(product.id);
                  }}
                  disabled={isEqual(inputDataProduct, product)}
                >
                  Edit product
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
                  Upload Product
                </Button>
              </CardActions>
            </>
          )}
        </Card>
      </Box>
    </>
  );
}
