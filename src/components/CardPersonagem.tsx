import { Box, Card, CardMedia } from '@mui/material';
import type { Personagem } from '../types/Personagem';

interface Props {
  personagem: Personagem;
  selecionado: boolean;
  jogadorSelecionado: 'P1' | 'P2' | null;
  onClick: () => void;
  exibeSetaVariantes?: boolean;
}

export function CardPersonagem({
  personagem,
  selecionado,
  jogadorSelecionado,
  onClick,
  exibeSetaVariantes = false,
}: Props) {
  return (
    <Card
      onClick={onClick}
      sx={{
        width: '100%',
        aspectRatio: '3 / 5',
        border: selecionado ? '3px solid #00e5ff' : '2px solid #333',
        borderRadius: 3,
        boxShadow: selecionado
          ? '0 0 15px #00e5ff'
          : '0 0 5px rgba(255,255,255,0.1)',
        backgroundColor: '#111',
        cursor: 'pointer',
        transition: 'all 0.2s ease-in-out',
        overflow: 'hidden',
        position: 'relative',
        '&:hover': {
          transform: 'scale(1.05)',
          borderColor: '#888',
        },
      }}
    >
      <CardMedia
        component="img"
        image={personagem.imagemCard || '/assets/placeholder.png'}
        alt={personagem.nome}
        sx={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />

      {/* Indicador de variante */}
      {exibeSetaVariantes && (
        <Box
          sx={{
            position: 'absolute',
            bottom: 4,
            right: 4,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            color: '#fff',
            fontSize: 14,
            px: 1,
            py: 0.5,
            borderRadius: 1,
          }}
        >
          ▼
        </Box>
      )}

      {/* Identificação de jogador (opcional visual extra) */}
      {jogadorSelecionado && (
        <Box
          sx={{
            position: 'absolute',
            top: 4,
            left: 4,
            backgroundColor:
              jogadorSelecionado === 'P1' ? '#00e5ff' : '#ff1744',
            color: '#000',
            fontWeight: 'bold',
            fontSize: 12,
            px: 1,
            borderRadius: 1,
          }}
        >
          {jogadorSelecionado}
        </Box>
      )}
    </Card>
  );
}
