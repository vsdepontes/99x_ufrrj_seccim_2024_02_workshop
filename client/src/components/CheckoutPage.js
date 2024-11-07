// src/components/CheckoutPage.js
import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  Box,
} from "@mui/material";

const CheckoutPage = ({
  selectedMovie,
  selectedSeat,
  tomorrowDate,
  handleBookingSuccess,
}) => {
  const [cardholderName, setCardholderName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvc, setCvc] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call to process payment
    setTimeout(() => {
      handleBookingSuccess(); // Call success callback after "payment" is processed
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <Card sx={{ marginTop: 3 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Checkout for {selectedMovie}
        </Typography>
        <Typography variant="body1">
          Selected Date: {tomorrowDate.toDateString()}
        </Typography>
        <Typography variant="h6" sx={{ marginTop: 2 }}>
          Selected Seat: {selectedSeat}
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ marginTop: 3 }}>
          <TextField
            label="Cardholder Name"
            fullWidth
            variant="outlined"
            sx={{ marginBottom: 2 }}
            value={cardholderName}
            onChange={(e) => setCardholderName(e.target.value)}
            required
          />
          <TextField
            label="Card Number"
            fullWidth
            variant="outlined"
            sx={{ marginBottom: 2 }}
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            required
          />
          <Box display="flex" justifyContent="space-between">
            <TextField
              label="Expiry Date (MM/YY)"
              variant="outlined"
              sx={{ marginBottom: 2, width: "48%" }}
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              required
            />
            <TextField
              label="CVC"
              variant="outlined"
              sx={{ marginBottom: 2, width: "48%" }}
              value={cvc}
              onChange={(e) => setCvc(e.target.value)}
              required
            />
          </Box>

          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            disabled={isSubmitting}
          >
            {isSubmitting ? "Processing..." : "Pay Now"}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CheckoutPage;
