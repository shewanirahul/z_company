import React from "react";
import { Jumbotron, Container } from "react-bootstrap";
import "./WelcomeHeader.css";

export const WelcomeHeader = () => (
  <Jumbotron fluid className="jumbo">
    <Container>
      <div className="welcomeDiv">
        <p className="welcomeP">Welcome to CompanyZ!</p>
      </div>
    </Container>
  </Jumbotron>
);
