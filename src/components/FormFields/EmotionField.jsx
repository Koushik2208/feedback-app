import React from 'react';
import { Box, Typography } from '@mui/material';
import { emotions } from '../../constants/emotions';
 
export const EmotionField = ({ field, value, onChange }) => (
  <Box>
    <Typography component="legend">{field.label}</Typography>
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'space-around', 
      gap: 2, 
      mt: 2 
    }}>
      {emotions.map((emotion) => (
        <Box
          key={emotion.value}
          onClick={() => onChange(field.name, emotion.value)}
          sx={{
            cursor: 'pointer',
            p: 2,
            borderRadius: 2,
            transition: 'all 0.2s',
            backgroundColor: 'transparent',
            '&:hover': {
              transform: 'scale(1.05)',
            },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <Box sx={{ 
            color: value === emotion.value ? '#2563eb' : '#64748b',
            transition: 'color 0.2s'
          }}>
            {emotion.icon}
          </Box>
          <Typography
            sx={{
              fontWeight: value === emotion.value ? 600 : 400,
              color: value === emotion.value ? '#2563eb' : '#64748b',
            }}
          >
            {emotion.label}
          </Typography>
        </Box>
      ))}
    </Box>
  </Box>
);