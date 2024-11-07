// src/components/HomePage.js
import React from "react";
import {
  Button,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";

const HomePage = ({
  selectedMovie,
  tomorrowDate,
  selectedSeat,
  handleSeatSelect,
  handleNextStep,
}) => {
  // Seat layout (can be customized)
  const seats = [
    ["A1", "A2", "A3", "A4"],
    ["B1", "B2", "B3", "B4"],
    ["C1", "C2", "C3", "C4"],
    ["D1", "D2", "D3", "D4"],
  ];

  return (
    <Card sx={{ marginBottom: 3 }}>
      <CardContent>
        <img
          src="https://flyingout.co.nz/cdn/shop/files/776782-Product-0-I-638586038404214147_460x@2x.webp?v=1726117485"
          width="200"
          alt="Movie"
        />
        <Typography variant="h5" gutterBottom>
          Selected Movie: {selectedMovie}
        </Typography>
        <Typography variant="body1">
          Selected Date: {tomorrowDate.toDateString()}
        </Typography>
        <Typography variant="h5" gutterBottom sx={{ marginTop: 2 }}>
          Select a Seat
        </Typography>

        <Grid container spacing={2} justifyContent="center">
          {seats.map((row, rowIndex) => (
            <Grid item xs={12} key={rowIndex}>
              <Grid container justifyContent="center" spacing={2}>
                {row.map((seat, index) => (
                  <Grid item key={seat}>
                    <Button
                      variant={selectedSeat === seat ? "contained" : "outlined"}
                      color="primary"
                      onClick={() => handleSeatSelect(seat)}
                    >
                      {seat}
                    </Button>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          ))}
        </Grid>

        {selectedSeat && (
          <Typography variant="body1" sx={{ marginTop: 2 }}>
            Selected Seat: {selectedSeat}
          </Typography>
        )}

        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: 3 }}
          onClick={handleNextStep}
        >
          Next Step
        </Button>
      </CardContent>
    </Card>
  );
};

export default HomePage;
