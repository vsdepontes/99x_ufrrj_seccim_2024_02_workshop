import React, { useEffect, useState } from "react";
import {
  Button,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  LinearProgress,
  CircularProgress,
} from "@mui/material";
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import ChairAltOutlinedIcon from "@mui/icons-material/ChairAltOutlined";
import { getSeats, makeBooking } from "../services/movieService";
import { configs } from '../utils/configs';
import { getSessionDateString } from '../utils/dateHelper';

const HomePage = ({
  movieName,
  selectedSeat,
  handleSeatSelect,
  handleNextStep,
  setPaymentCode,
}) => {
  const [seats, setSeats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMakingBooking, setIsMakingBooking] = useState(false);

  useEffect(() => {
    const sessionData = {
      theaterId: configs.theaterId,
      roomId: configs.roomId,
      sessionId: configs.sessionId,
    }
    getSeats(sessionData)
      .then((seats) => {
        setIsLoading(true);
        setSeats(seats);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const nextButtonClick = async () => {
    setIsMakingBooking(true);
    makeBooking({
      theaterId: configs.theaterId,
      roomId: configs.roomId,
      sessionId: configs.sessionId,
      seatId: selectedSeat,
      customerId: configs.customerId,
      movieId: configs.movieId,
    })
      .then((paymentCode) => {
        setPaymentCode(paymentCode);
        handleNextStep();
      })
      .finally(() => {
        setIsMakingBooking(false);
      });
  };

  return (
    <Card sx={{ marginBottom: 3, borderRadius: 2 }}>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
          <img src="/matrix.webp" width="200" alt="Movie" />
          <Typography variant="h5" gutterBottom sx={{ marginLeft: 2 }}>
            {movieName}
          </Typography>
        </Box>

        <Box
          sx={{
            backgroundColor: "#f0f0f0",
            padding: "16px",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 2,
          }}
        >
          <DateRangeOutlinedIcon sx={{ marginRight: 1, color: "#4caf50" }} />
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", fontSize: "1.2rem" }}
          >
            Selected Session: {getSessionDateString()}
          </Typography>
        </Box>

        <Typography
          variant="h6"
          sx={{
            marginTop: 3,
            fontWeight: "bold",
            fontSize: "1.2rem",
            display: "flex",
            alignItems: "center",
          }}
        >
          <ChairAltOutlinedIcon sx={{ marginRight: 1, color: "#3f51b5" }} />
          Available Seats
        </Typography>

        <Grid
          container
          spacing={2}
          justifyContent="center"
          sx={{ marginTop: 2 }}
        >
          {isLoading ? (
            <Box sx={{ width: "100%" }}>
              <LinearProgress />
            </Box>
          ) : (
            seats.map(({ seatId, isBooked }) => (
              <Grid item xs={3} sm={2} md={1} key={seatId}>
                {/* Ensures responsive design with 4 columns on mobile */}
                <Button
                  variant={selectedSeat === seatId ? "contained" : "outlined"}
                  color={!isBooked ? "primary" : "error"} // Different color for unavailable seats
                  onClick={() => handleSeatSelect(seatId)}
                  fullWidth
                  disabled={isBooked} // Disable the button if the seat is booked
                  sx={{
                    fontWeight: "bold",
                    padding: 1.5,
                    borderRadius: 2,
                    ...(selectedSeat === seatId && {
                      color: "#fff",
                    }),
                  }}
                >
                  {seatId}
                </Button>
              </Grid>
            ))
          )}
        </Grid>

        {selectedSeat && (
          <Box
            sx={{
              padding: "12px",
              borderRadius: "8px",
              marginTop: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="body1"
              sx={{ fontWeight: "bold", fontSize: "1.1rem", color: "green" }}
            >
              Selected Seat:{" "}
              <span style={{ fontWeight: "bolder" }}>{selectedSeat}</span>
            </Typography>
          </Box>
        )}

        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: 3, padding: 1.5, borderRadius: 3 }}
          onClick={nextButtonClick}
          disabled={isMakingBooking}
          endIcon={isMakingBooking ? <CircularProgress size={20} /> : null}
        >
          {isMakingBooking ? "Processing" : "Proceed to Next Step"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default HomePage;
