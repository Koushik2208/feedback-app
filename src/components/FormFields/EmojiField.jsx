import React from "react";
import { Box, Typography } from "@mui/material";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const EmojiField = ({ field, value, onChange }) => {
  const emojis = [
    {
      id: 1,
      label: "Very Unhappy",
      link: "https://lottie.host/02ef546c-bb06-40db-b66b-f69fdc8413ba/UQtCsS5o6R.lottie",
    },
    {
      id: 2,
      label: "Unhappy",
      link: "https://lottie.host/f95acea9-258a-46e0-a990-7952a4a19d4d/xhqZGHfraE.lottie",
    },
    {
      id: 3,
      label: "Neutral",
      link: "https://lottie.host/a20625f8-8e05-4701-9c14-7898ee491e53/iNdzu3Znru.lottie",
    },
    {
      id: 4,
      label: "Happy",
      link: "https://lottie.host/d9fa61c2-07d7-4915-a660-753566812149/cIB7I7Zz0f.lottie",
    },
    {
      id: 5,
      label: "Very Happy",
      link: "https://lottie.host/efbd533f-58f6-438b-b92c-7636ee793216/tYNcu4TsFe.lottie",
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        flexWrap: "wrap",
        gap: 2,
      }}
    >
      {emojis.map((emoji) => (
        <Box
          key={emoji.id}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            cursor: "pointer",
            opacity: value === emoji.id ? 1 : 0.5,
            "&:hover": {
              opacity: 1,
            },
          }}
          onClick={() => onChange(field, emoji.id)}
        >
          <Box sx={{ width: 50, height: 50 }}>
            <DotLottieReact
              src={emoji.link}
              loop
              autoplay
            />
          </Box>
          <Typography variant="caption" sx={{ textAlign: "center" }}>
            {emoji.label}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export { EmojiField };
