// src/App.js
import React, { useState } from "react";
import { Container } from "@mui/material";
import HomePage from "./components/HomePage";
import CheckoutPage from "./components/CheckoutPage";
import ConfirmationPage from "./components/ConfirmationPage";
import { NavBar } from "./components/NavBar";

const App = () => {
  const [selectedStep, setSelectedStep] = useState(1); // Manage steps (1 = home, 2 = checkout, 3 = confirmation)
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [paymentCode, setPaymentCode] = useState(undefined);
  const [paymentInfo, setPaymentInfo] = useState({});

  // Hardcoded movie name
  const movieName = "The Matrix";

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

  const handleBookingSuccess = (payload) => {
    setPaymentInfo(payload);
    setSelectedStep(3); // Move to confirmation step
  };

  const handleGoHome = () => {
    setSelectedStep(1); // Go back to the homepage
    setSelectedSeat(null); // Reset seat selection
  };

  return (
    <>
      <NavBar />
      <Container>
        {selectedStep === 1 && (
          <HomePage
            movieName={movieName}
            selectedSeat={selectedSeat}
            handleSeatSelect={handleSeatSelect}
            handleNextStep={handleNextStep}
            setPaymentCode={setPaymentCode}
          />
        )}
        {selectedStep === 2 && (
          <CheckoutPage
            movieName={movieName}
            selectedSeat={selectedSeat}
            handleBookingSuccess={handleBookingSuccess}
            paymentCode={paymentCode}
          />
        )}
        {selectedStep === 3 && <ConfirmationPage handleGoHome={handleGoHome} />}
      </Container>
    </>
  );
};

export default App;
