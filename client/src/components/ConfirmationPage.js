// src/components/ConfirmationPage.js
import React from "react";
import { Button, Typography } from "@mui/material";

const ConfirmationPage = ({ handleGoHome }) => {
  return (
    <div>
      <Typography
        variant="h3"
        align="center"
        style={{ color: "green", fontWeight: "bold" }}
      >
        Booking Confirmed!
      </Typography>
      <Typography variant="body1" align="center">
        Please check your email for the confirmation
      </Typography>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{ marginTop: 3 }}
        onClick={handleGoHome}
      >
        Go to Homepage
      </Button>
    </div>
  );
};

export default ConfirmationPage;
