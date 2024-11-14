import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  Box,
  Grid,
  CircularProgress,
} from "@mui/material";
import { makePayment } from "../services/movieService";
import { getSessionDateString } from '../utils/dateHelper';

const CheckoutPage = ({
  movieName,
  selectedSeat,
  handleBookingSuccess,
  paymentCode,
}) => {
  const timeout = 60;
  const [cardholderName, setCardholderName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvc, setCvc] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [timer, setTimer] = useState(timeout);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    // Start the timer when the page loads
    const id = setInterval(() => {
      setTimer((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(id); // Stop the timer when it reaches 0
          window.location.href = "/";
        }
        return prevTime - 1;
      });
    }, 1000);

    setIntervalId(id);

    return () => clearInterval(id); // Cleanup on unmount
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    makePayment(paymentCode, {
      cardholderName,
      cardNumber,
      expiryDate,
      cvc,
    })
      .then(() => {
        handleBookingSuccess({
          cardholderName,
          cardNumber,
          expiryDate,
          cvc,
        });
      })
      .finally(() => {
        setIsSubmitting(false);
        setTimer(timeout);
      });
  };

  return (
    <Card
      sx={{ marginTop: 3, maxWidth: 500, mx: "auto", position: "relative" }}
    >
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Complete Your Purchase
        </Typography>
        <Typography variant="subtitle1">
          <strong>Movie:</strong> {movieName}
        </Typography>
        <Typography variant="subtitle1">
          <strong>Date:</strong> {getSessionDateString()}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          <strong>Seat:</strong> {selectedSeat}
        </Typography>

        {/* Timer and Progress Bar */}
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            display: "flex",
            alignItems: "center",
          }}
        >
          <CircularProgress
            variant="determinate"
            value={(timer / timeout) * 100}
            size={60}
            thickness={4}
            sx={{ marginRight: 2 }}
          />
          <Typography variant="h6">{timer} s</Typography>
        </Box>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            label="Cardholder Name"
            fullWidth
            variant="outlined"
            sx={{ mb: 2 }}
            value={cardholderName}
            onChange={(event) => setCardholderName(event.target.value)}
            required
          />
          <TextField
            label="Card Number"
            type="number"
            fullWidth
            variant="outlined"
            sx={{ mb: 2 }}
            value={cardNumber}
            onChange={(event) => setCardNumber(event.target.value)}
            required
            inputProps={{ maxLength: 16 }}
          />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Expiry Date (MM/YY)"
                fullWidth
                variant="outlined"
                value={expiryDate}
                onChange={(event) => setExpiryDate(event.target.value)}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="CVC"
                type="number"
                fullWidth
                variant="outlined"
                value={cvc}
                onChange={(event) => setCvc(event.target.value)}
                required
                inputProps={{ maxLength: 3 }}
              />
            </Grid>
          </Grid>

          <Box
            mt={3}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              sx={{ marginTop: 3, padding: 1.5, borderRadius: 3 }}
              disabled={isSubmitting || timer === 0}
              endIcon={isSubmitting ? <CircularProgress size={20} /> : null}
            >
              {isSubmitting ? "Processing..." : "Pay Now"}
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CheckoutPage;
