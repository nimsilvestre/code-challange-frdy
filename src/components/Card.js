import React from "react";
import PropTypes from "prop-types";

const Card = ({
  make,
  model,
  fuelType,
  bodyType,
  enginePowerPS,
  enginePowerKW,
  engineCapacity,
}) => {
  return (
    <div
      style={{ color: "black", border: "2px solid gray", marginBottom: "20px" }}
    >
      <h2>
        {make} {model}
      </h2>
      <div>
        <p>
          <strong>Body:</strong> {bodyType}
        </p>
        <p>
          <strong>Fuel Type:</strong> {fuelType}
        </p>
        <p>
          <strong>Engine Power PS:</strong> {enginePowerPS}
        </p>
        <p>
          <strong>Engine Power KW:</strong> {enginePowerKW}
        </p>
        <p>
          <strong>Engine Capacity:</strong> {engineCapacity}
        </p>
      </div>
    </div>
  );
};

Card.propTypes = {
  make: PropTypes.string.isRequired,
  model: PropTypes.string.isRequired,
  fuelType: PropTypes.string.isRequired,
  bodyType: PropTypes.string.isRequired,
  enginePowerPS: PropTypes.number.isRequired,
  enginePowerKW: PropTypes.number.isRequired,
  engineCapacity: PropTypes.number.isRequired,
};

export default Card;
