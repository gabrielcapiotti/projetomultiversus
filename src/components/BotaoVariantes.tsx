import { Box, Typography } from '@mui/material';

interface BotaoVariantesProps {
  ativo: boolean;
  onClick: () => void;
  cor: string;
}

export function BotaoVariantes({ ativo, onClick, cor }: BotaoVariantesProps) {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: 10,
        right: -50,
        bgcolor: '#1e1e1ecc',
        border: `1px solid ${cor}`,
        borderRadius: 1,
        px: 1,
        py: 0.5,
        cursor: 'pointer',
        '&:hover': { bgcolor: `${cor}44` },
        boxShadow: `0 0 8px ${cor}`,
        zIndex: 15,
      }}
      onClick={onClick}
    >
      <Typography variant="caption" color={cor}>
        {ativo ? 'Fechar' : 'Variantes'}
      </Typography>
    </Box>
  );
}
