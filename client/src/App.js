// src/App.js
import React, { useState } from "react";
import { Container, Typography } from "@mui/material";
import HomePage from "./components/HomePage";
import CheckoutPage from "./components/CheckoutPage";
import ConfirmationPage from "./components/ConfirmationPage";

const App = () => {
  const [selectedStep, setSelectedStep] = useState(1); // Manage steps (1 = home, 2 = checkout, 3 = confirmation)
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [email, setEmail] = useState("");

  // Hardcoded selected movie and tomorrow's date
  const selectedMovie = "The Matrix";
  const tomorrowDate = new Date();
  tomorrowDate.setDate(tomorrowDate.getDate() + 1); // Get tomorrow's date

  const handleSeatSelect = (seat) => {
    setSelectedSeat(seat);
  };

  const handleNextStep = () => {
    if (!selectedSeat) {
      alert("Please select a seat to proceed!");
    } else {
      setSelectedStep(2); // Move to checkout step
    }
  };

  const handleBookingSuccess = (email) => {
    setEmail(email);
    setSelectedStep(3); // Move to confirmation step
  };

  const handleGoHome = () => {
    setSelectedStep(1); // Go back to the homepage
    setSelectedSeat(null); // Reset seat selection
  };

  return (
    <Container>
      <Typography variant="h3" align="center" gutterBottom>
        Movie Booking App
      </Typography>

      {selectedStep === 1 && (
        <HomePage
          selectedMovie={selectedMovie}
          tomorrowDate={tomorrowDate}
          selectedSeat={selectedSeat}
          handleSeatSelect={handleSeatSelect}
          handleNextStep={handleNextStep}
        />
      )}
      {selectedStep === 2 && (
        <CheckoutPage
          selectedMovie={selectedMovie}
          tomorrowDate={tomorrowDate}
          selectedSeat={selectedSeat}
          email={email}
          setEmail={setEmail}
          handleBookingSuccess={handleBookingSuccess}
        />
      )}
      {selectedStep === 3 && (
        <ConfirmationPage email={email} handleGoHome={handleGoHome} />
      )}
    </Container>
  );
};

export default App;
