import { Button, TextField } from '@mui/material';
import { Product } from '../type/type';
import { apiDeleteProduct } from '../api/apiClient';
import { useEffect, useState } from 'react';
import { updateProduct } from '../api/apiHooks';
interface props {
  product: Product;
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
}
export function ProductDisplay(props: props) {
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

export function ProductModif(props: props) {
  const { product, setReload } = props;
  const [modifProduct, setModifProduct] = useState<Product>(product);

  useEffect(() => {
    console.log('MODIF', modifProduct);
  }, [modifProduct]);

  const handleDeleteProduct = async (id: number) => {
    console.log('handleDeleteProduct', id);
    try {
      const result = await apiDeleteProduct(id);
      console.log('SIKER handleDeleteProduct', id, result);
      setReload((prev) => !prev);
    } catch (err) {
      console.log({
        type: 'ERROR',
        fnc: 'handleDeleteProduct',
        param: id,
        error: err,
      });
    }
  };

  const handleAddToCart = (id: number) => {
    console.log('handleAddToCart', id);
  };

  const handleModifProduct = async (id: number) => {
    console.log('handleModifProduct', id);
    try {
      const result = await updateProduct(modifProduct);
      console.log('SIKER handleModifProduct', id, result);
    } catch (error) {
      console.log({
        type: 'ERROR',
        fnc: 'handleModifProduct',
        param: id,
        error: error,
      });
    }
  };

  return (
    <>
      <TextField
        label="Név"
        type="text"
        value={modifProduct.name}
        onChange={(e) =>
          setModifProduct({ ...modifProduct, name: e.target.value })
        }
        fullWidth
        margin="dense"
      />
      <TextField
        label="Ár"
        type="number"
        value={modifProduct.price}
        onChange={(e) =>
          setModifProduct({ ...modifProduct, price: Number(e.target.value) })
        }
        fullWidth
        margin="dense"
      />
      <TextField
        label="Mennyiség"
        type="number"
        value={modifProduct.stock}
        onChange={(e) =>
          setModifProduct({ ...modifProduct, stock: Number(e.target.value) })
        }
        fullWidth
        margin="dense"
      />

      <Button
        onClick={() => {
          handleAddToCart(product.id);
        }}
      >
        Termék Kosárhoz adása
      </Button>
      <Button
        onClick={() => {
          handleDeleteProduct(product.id);
        }}
      >
        Termék törlése
      </Button>

      <Button
        onClick={() => {
          handleModifProduct(product.id);
        }}
      >
        Termék módosítása
      </Button>
    </>
  );
}
