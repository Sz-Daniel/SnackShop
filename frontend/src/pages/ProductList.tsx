import { useProducts } from '../api/apiHooks';
import { Box } from '@mui/material';

export function ProductList() {
  const { data, error } = useProducts();

  const productModific = () => {};
  return (
    <>
      {data.map((prod) => (
        <Box key={prod.id} border={1} padding={2} margin={1}>
          <div>
            <div>
              <strong>{prod.name}</strong>
            </div>
            <div>Ár: {prod.price} Ft</div>
            <div>Készlet: {prod.stock}</div>
            <button onClick={() => {}}>Termék Módosítása</button>
          </div>
        </Box>
      ))}
    </>
  );
}
