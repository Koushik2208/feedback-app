import { Box, Button, TextField, Avatar } from "@mui/material";
import { useState, useEffect } from "react";

export const FileUploadField = ({ field, value, onChange }) => {
  const [imageUrl, setImageUrl] = useState(value || "");
  const [file, setFile] = useState(null);

  useEffect(() => {
    setImageUrl(value || "");
  }, [value]);

  const handleImageUrlChange = (event) => {
    setImageUrl(event.target.value);
    onChange(event.target.value);
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    onChange(selectedFile);
    setImageUrl(URL.createObjectURL(selectedFile));
  };

  return (
    <Box>
      <Box
        sx={{
          border: "1px dashed #EEEEEE",
          borderRadius: "8px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "200px",
          cursor: "pointer",
        }}
      >
        <label htmlFor="image-upload">
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "230px",
              backgroundColor: "#D2E7F0",
              width: "300px",
              borderRadius: "10px",
              border: "1px dashed blue",
              marginBottom: "25px",
            }}
          >
            {file ? (
              <Avatar
                alt={file.name}
                src={imageUrl}
                variant="square"
                sx={{ width: 100, height: 100 }}
              />
            ) : (
              <>
                <Box
                  component="img"
                  src={require("../images/cloud-upload.png")}
                  alt="Upload Prescription"
                  sx={{ width: "48px", height: "48px" }}
                />
                <Box component="span" sx={{ marginLeft: "8px" }}>
                  Video or Image
                </Box>
              </>
            )}
          </Box>
        </label>
      </Box>
      <TextField
        placeholder={field.label}
        variant="outlined"
        fullWidth
        name={field.name}
        value={imageUrl}
        onChange={handleImageUrlChange}
        required={field.required}
        sx={{ marginTop: "16px" }}
      />
      <Button variant="contained" color="primary" sx={{ marginTop: "16px" }}>
        Upload
      </Button>
    </Box>
  );
};
