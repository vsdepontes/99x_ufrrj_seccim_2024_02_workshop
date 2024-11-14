import React from "react";
import { Button, Typography, Box } from "@mui/material";

const ConfirmationPage = ({ email, handleGoHome }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: 2,
        overflow: "hidden",
      }}
    >
      <Typography
        variant="h3"
        sx={{
          color: "green",
          fontWeight: "bold",
          marginBottom: 2, // Add spacing between title and body
        }}
      >
        Booking Confirmed!
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: 3 }}>
        Please check your email for the confirmation.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{ marginTop: 3, padding: 1.5, borderRadius: 3, width: "200px" }}
        onClick={handleGoHome}
      >
        Go to Homepage
      </Button>
    </Box>
  );
};

export default ConfirmationPage;
