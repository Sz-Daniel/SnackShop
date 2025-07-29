import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
} from '@mui/material';
import { getLogs, useLogs } from '../../api/apiHooks';
import { useEffect, useState } from 'react';

export type LogItem = {
  id: number;
  url: string;
  method: string;
  time: string;
  message: string | null;
  stack: string | null;
  requestId: string | null;
};

export function Logs() {
  const [logs, setLogs] = useState<LogItem[]>([]);
  const { data: logsData, error: logsError } = useLogs();

  useEffect(() => {
    console.log('Logs data fetched:', logsData);
    if (logsData) {
      setLogs(logsData);
    }
  }, [logsData]);
  if (logsError) {
    return (
      <Typography color="error">Hiba történt a logok betöltésekor.</Typography>
    );
  }

  return (
    <>
      <Typography variant="h6" sx={{ m: 2 }}>
        API válasz logok
      </Typography>
      {logs.map((item) => (
        <Box key={item.id} sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            {item.url}
          </Box>
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            {item.method}
          </Box>
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            {new Date(item.time).toLocaleString()}
          </Box>
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            {item.message || 'N/A'}
          </Box>
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            {item.stack || 'N/A'}
          </Box>
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            {item.requestId || 'N/A'}
          </Box>
        </Box>
      ))}
    </>
  );
}
