import { useState } from 'react';
import {
  Box,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  IconButton,
} from '@mui/material';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import { personagens } from '../data/personagensOmniverso';
import { personagens as personagensTecnoWitch } from '../data/personagensTecnoWitch';
import { personagens as personagensLastWitches } from '../data/personagensLastWitches';
import { personagens as personagensNewLand } from '../data/personagensNewLand';
import { CardPersonagem } from '../components/CardPersonagem';
import type { Personagem } from '../types/Personagem';

const todosPersonagens: Personagem[] = [
  ...personagens,
  ...personagensTecnoWitch,
  ...personagensLastWitches,
  ...personagensNewLand,
];

const coresPorUniverso: Record<string, { fundo: string; borda: string; sombra: string }> = {
  'Omniverso': {
    fundo: 'radial-gradient(ellipse at center, #1c1f2b 0%, #0e101a 100%)',
    borda: '#00e5ff',
    sombra: '#00e5ff44',
  },
  'NewLand2': {
    fundo: 'radial-gradient(ellipse at center, #204020 0%, #182818 100%)',
    borda: '#66bb6a',
    sombra: '#66bb6a44',
  },
  'TecnoWitch': {
    fundo: 'radial-gradient(ellipse at center, #3c1e3e 0%, #0e001a 100%)',
    borda: '#ab47bc',
    sombra: '#ab47bc44',
  },
  'LastWitches': {
    fundo: 'radial-gradient(ellipse at center, #3c1e1e 0%, #1a0e0e 100%)',
    borda: '#ff1744',
    sombra: '#ff174444',
  },
};

const universosDisponiveis = Array.from(new Set(todosPersonagens.map((p) => p.universo)));

const agruparPersonagensPorNomeBase = (personagens: Personagem[]) => {
  const mapa = new Map<string, Personagem[]>();
  personagens.forEach((p) => {
    const chave = p.nomeBase || p.nome.split(/[-–]/)[0].trim();
    if (!mapa.has(chave)) {
      mapa.set(chave, []);
    }
    mapa.get(chave)!.push(p);
  });

  return Array.from(mapa.entries()).map(([nomeBase, variantes]) => ({
    nomeBase,
    variantes,
  }));
};

export function PaginaSelecao() {
  const [universoAtivo, setUniversoAtivo] = useState<string>(universosDisponiveis[0]);
  const [jogadorAtual, setJogadorAtual] = useState<'P1' | 'P2'>('P1');
  const [personagemP1, setPersonagemP1] = useState<Personagem | null>(null);
  const [personagemP2, setPersonagemP2] = useState<Personagem | null>(null);
  const [variantesP1, setVariantesP1] = useState<Personagem[]>([]);
  const [variantesP2, setVariantesP2] = useState<Personagem[]>([]);
  const [mostrarVariantesP1, setMostrarVariantesP1] = useState(false);
  const [mostrarVariantesP2, setMostrarVariantesP2] = useState(false);

  const personagensFiltrados = todosPersonagens.filter((p) => p.universo === universoAtivo);
  const grupos = agruparPersonagensPorNomeBase(personagensFiltrados);
  const tema = coresPorUniverso[universoAtivo] || coresPorUniverso['Omniverso'];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100vw', bgcolor: '#000000ee' }}>
      {/* Seleção de Universo */}
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <ToggleButtonGroup
          color="standard"
          value={universoAtivo}
          exclusive
          onChange={(e, novoUniverso) => {
            if (novoUniverso) {
              setUniversoAtivo(novoUniverso);
            }
          }}
          sx={{ backgroundColor: '#1e1e1e', borderRadius: 2 }}
        >
          {universosDisponiveis.map((universo) => (
            <ToggleButton key={universo} value={universo} sx={{ color: '#ccc' }}>
              {universo.toUpperCase()}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Box>

      {/* P1 e P2 */}
      <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', minHeight: 400, px: 2 }}>
        {/* P1 */}
        <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          {personagemP1 && mostrarVariantesP1 && variantesP1.length > 1 && (
            <ToggleButtonGroup
              orientation="vertical"
              exclusive
              value={personagemP1.id}
              onChange={(_, novaId) => {
                if (!novaId) return;
                const nova = variantesP1.find((v) => v.id === novaId);
                if (nova) setPersonagemP1({ ...nova });
              }}
              sx={{
                position: 'absolute',
                left: '-10px',
                top: '25%',
                transform: 'translateY(-50%)',
                bgcolor: '#1e1e1ecc',
                borderRadius: 1,
                p: 0.5,
                boxShadow: `0 0 10px ${tema.borda}`,
                zIndex: 10,
                width: 180,
              }}
            >
              {variantesP1.map((v) => (
                <ToggleButton
                  key={v.id}
                  value={v.id}
                  sx={{
                    color: tema.borda,
                    bgcolor: '#121212',
                    width: '100%',
                    height: 36,
                    fontSize: '9px',
                    px: 1,
                    whiteSpace: 'nowrap',
                    '&.Mui-selected': {
                      bgcolor: tema.borda,
                      color: '#000',
                    },
                    '&:hover': {
                      bgcolor: `${tema.borda}44`,
                    },
                  }}
                >
                  {v.descricao}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          )}

          <Box sx={{ textAlign: 'center', color: tema.borda }}>
            {personagemP1 ? (
              <>
                <Box sx={{ position: 'relative' }}>
                  <Box
                    component="img"
                    src={personagemP1.imagemDestaque}
                    alt={personagemP1.nome}
                    sx={{
                      height: 380,
                      width: 220,
                      objectFit: 'cover',
                      borderRadius: 2,
                      boxShadow: `0 0 12px ${tema.borda}`,
                    }}
                  />
                  {variantesP1.length > 1 && (
                    <IconButton
                      onClick={() => setMostrarVariantesP1(v => !v)}
                      sx={{
                        position: 'absolute',
                        top: 10,
                        left: -50,
                        bgcolor: '#1e1e1e',
                        border: `1px solid ${tema.borda}`,
                        boxShadow: `0 0 8px ${tema.borda}`,
                        '&:hover': {
                          bgcolor: `${tema.borda}22`,
                        },
                      }}
                    >
                      <SwapHorizIcon sx={{ color: tema.borda }} />
                    </IconButton>
                  )}
                </Box>
                <Typography variant="h6" mt={1}>{personagemP1.nome}</Typography>
              </>
            ) : <Typography variant="h6">Jogador 1</Typography>}
          </Box>
        </Box>

        <Typography variant="h3" color="white">VS</Typography>

        {/* P2 */}
        <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          <Box sx={{ textAlign: 'center', color: tema.borda }}>
            {personagemP2 ? (
              <>
                <Box sx={{ position: 'relative' }}>
                  <Box
                    component="img"
                    src={personagemP2.imagemDestaque}
                    alt={personagemP2.nome}
                    sx={{
                      height: 380,
                      width: 220,
                      objectFit: 'cover',
                      borderRadius: 2,
                      boxShadow: `0 0 12px ${tema.borda}`,
                    }}
                  />
                  {variantesP2.length > 1 && (
                    <IconButton
                      onClick={() => setMostrarVariantesP2(v => !v)}
                      sx={{
                        position: 'absolute',
                        top: 10,
                        right: -50,
                        bgcolor: '#1e1e1e',
                        border: `1px solid ${tema.borda}`,
                        boxShadow: `0 0 8px ${tema.borda}`,
                        '&:hover': {
                          bgcolor: `${tema.borda}22`,
                        },
                      }}
                    >
                      <SwapHorizIcon sx={{ color: tema.borda }} />
                    </IconButton>
                  )}
                </Box>
                <Typography variant="h6" mt={1}>{personagemP2.nome}</Typography>
              </>
            ) : <Typography variant="h6">Jogador 2</Typography>}
          </Box>

          {personagemP2 && mostrarVariantesP2 && variantesP2.length > 1 && (
            <ToggleButtonGroup
              orientation="vertical"
              exclusive
              value={personagemP2.id}
              onChange={(_, novaId) => {
                if (!novaId) return;
                const nova = variantesP2.find((v) => v.id === novaId);
                if (nova) setPersonagemP2({ ...nova });
              }}
              sx={{
                position: 'absolute',
                right: '-10px',
                top: '25%',
                transform: 'translateY(-50%)',
                bgcolor: '#1e1e1ecc',
                borderRadius: 1,
                p: 0.5,
                boxShadow: `0 0 10px ${tema.borda}`,
                zIndex: 10,
                width: 180,
              }}
            >
              {variantesP2.map((v) => (
                <ToggleButton
                  key={v.id}
                  value={v.id}
                  sx={{
                    color: tema.borda,
                    bgcolor: '#121212',
                    width: '100%',
                    height: 36,
                    fontSize: '9px',
                    px: 1,
                    whiteSpace: 'nowrap',
                    '&.Mui-selected': {
                      bgcolor: tema.borda,
                      color: '#000',
                    },
                    '&:hover': {
                      bgcolor: `${tema.borda}44`,
                    },
                  }}
                >
                  {v.descricao}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          )}
        </Box>
      </Box>

      {/* Grade de Seleção */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(auto-fill, minmax(100px, 1fr))' }, gap: 1.5, p: 2, background: tema.fundo }}>
        {grupos.map((grupo) => (
          <CardPersonagem
            key={grupo.nomeBase}
            personagem={grupo.variantes[0]}
            selecionado={false}
            jogadorSelecionado={
              grupo.variantes.some(v => v.id === personagemP1?.id) ? 'P1' :
              grupo.variantes.some(v => v.id === personagemP2?.id) ? 'P2' : null
            }
            onClick={() => {
              const variantesTodas = todosPersonagens.filter(p => p.nomeBase === grupo.nomeBase);

              if (jogadorAtual === 'P1') {
                setPersonagemP1(grupo.variantes[0]);
                setVariantesP1(variantesTodas);
                setMostrarVariantesP1(false);
                setJogadorAtual('P2');
              } else {
                setPersonagemP2(grupo.variantes[0]);
                setVariantesP2(variantesTodas);
                setMostrarVariantesP2(false);
                setJogadorAtual('P1');
              }
            }}
          />
        ))}
      </Box>
    </Box>
  );
}
