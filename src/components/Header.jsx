import { Typography } from "@mui/material";

const Header = ({ title }) => {
  return (
    <Typography
      variant="h4"
      component="h1"
      gutterBottom
      align="center"
      backgroundColor="#7C3996"
      color="white"
      sx={{ padding: "63px 0px" }}
    >
      {title}
    </Typography>
  );
};

export default Header;
