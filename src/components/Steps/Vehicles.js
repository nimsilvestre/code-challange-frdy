import React from "react";
import PropTypes from "prop-types";

//Redux
import { useSelector } from "react-redux";

//Components
import { FormH1 } from "../Form/FormElements";
import Card from "../Card";
import Pagination from "../Pagination";

const Vehicles = ({
  apiErrors,
  stepData,
  prevStep,
  restartSteps,
  vehiclePerPage,
  totalVehicles,
  paginate,
}) => {
  
  //Handle button back click
  const handleBack = (e) => {
    e.preventDefault();
    prevStep();
  };

  return (
    <>
      {apiErrors ? (
        //Add Page404
        <div>
          <p>{apiErrors}</p>
          <button onClick={handleBack}>Back</button>
        </div>
      ) : (
        <div>
          <FormH1>Vehicles</FormH1>
          <br />
          <button onClick={handleBack}>Back</button>
          <button onClick={() => restartSteps()}>Start Over</button>
          <ul style={{ listStyle: "none" }}>
            {stepData !== null ? (
              stepData && stepData.length === 0 ? (
                <div>
                  <p>
                    Ops it looks like we don't have this Model Vehicles in our
                    API.
                  </p>
                  <strong>Please choose another Model</strong>
                  <br />
                </div>
              ) : (
                stepData.map((vehicle, id) => (
                  <li key={id}>
                    <Card
                      make={vehicle.make}
                      model={vehicle.model}
                      enginePowerPS={vehicle.enginePowerPS}
                      enginePowerKW={vehicle.enginePowerKW}
                      fuelType={vehicle.fuelType}
                      engineCapacity={vehicle.engineCapacity}
                      bodyType={vehicle.bodyType}
                    />
                  </li>
                ))
              )
            ) : null}
          </ul>
          <Pagination
            vehiclePerPage={vehiclePerPage}
            totalVehicles={totalVehicles}
            paginate={paginate}
          />
        </div>
      )}
    </>
  );
};

Vehicles.propTypes = {
  stepData: PropTypes.array,
  prevStep: PropTypes.func,
  restartSteps: PropTypes.func,
  vehiclePerPage: PropTypes.number,
  totalVehicles: PropTypes.number,
  paginate: PropTypes.func,
};

export default Vehicles;
