import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';

type ModalProps = {
  open: boolean;
  title?: string;
  content: string;
  onClose: () => void;
};

export default function Modal({
  open,
  title = 'Hiba',
  content,
  onClose,
}: ModalProps) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{content}</DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Bezárás</Button>
      </DialogActions>
    </Dialog>
  );
}
