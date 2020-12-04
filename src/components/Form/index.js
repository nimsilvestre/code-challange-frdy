import React, { useState } from "react";
import PropTypes from "prop-types";

//Redux
import { useDispatch } from "react-redux";
import { clearErrors } from "../../features/car/carSlice";

//Components
import Makes from "../Steps/Makes";
import Models from "../Steps/Models";
import Vehicles from "../Steps/Vehicles";

/**
 *
 *
 * @param {*} {
 *   makes,
 *   models,
 *   vehicles,
 *   apiErrors,
 *   resetState,
 *   getVehicles,
 *   getCarModels,
 *   requestObject,
 *   updateRequestObject,
 * }
 * @return {*}
 */

const Form = ({
  makes,
  models,
  vehicles,
  apiErrors,
  resetState,
  getVehicles,
  getCarModels,
  requestObject,
  updateRequestObject,
}) => {
  const [step, setStep] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [vehiclePerPage] = useState(25);
  const dispatch = useDispatch();

  //Proceed to next step
  /**
   *This function will handle the button press when the user wants to go to the next step.
   *It will add 1+ to the current step state
   */
  const nextStep = () => {
    setStep(step + 1);
  };

  //Go back to prev step
  const prevStep = () => {
    setStep(step - 1);
    dispatch(clearErrors());
  };

  //Go back to prev step
  const restartSteps = () => {
    setStep(1);
    resetState();
  };

  //Handle fields change
  const onSelectChange = (e) => {
    updateRequestObject([
      {
        name: e.target.name,
        value: e.target.value,
      },
    ]);
  };

  //Get current vehicles
  const indexOfLastVehicle = currentPage * vehiclePerPage;
  const indexOfFirstVehicle = indexOfLastVehicle - vehiclePerPage;
  let currentVehicles =
    vehicles !== null
      ? vehicles.slice(indexOfFirstVehicle, indexOfLastVehicle)
      : null;

  //Change Page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  let component;

  switch (step) {
    case 1:
      return (component = (
        <Makes
          stepId="makes"
          stepData={makes}
          nextStep={nextStep}
          apiErrors={apiErrors}
          restartSteps={restartSteps}
          getCarModels={getCarModels}
          handleChange={onSelectChange}
          requestObject={requestObject}
        />
      ));
    case 2:
      return (component = (
        <Models
          stepId="models"
          stepData={models}
          prevStep={prevStep}
          nextStep={nextStep}
          apiErrors={apiErrors}
          getVehicles={getVehicles}
          handleChange={onSelectChange}
          requestObject={requestObject}
        />
      ));
    case 3:
      return (component = (
        <Vehicles
          stepId="vehicles"
          paginate={paginate}
          nextStep={nextStep}
          prevStep={prevStep}
          apiErrors={apiErrors}
          stepData={currentVehicles}
          restartSteps={restartSteps}
          handleChange={onSelectChange}
          requestObject={requestObject}
          vehiclePerPage={vehiclePerPage}
          totalVehicles={vehicles !== null ? vehicles.length : 0}
        />
      ));
    default:
      break;
  }

  return { component };
};

Form.propTypes = {
  requestObject: PropTypes.object,
  makes: PropTypes.array,
  models: PropTypes.array,
  vehicles: PropTypes.array,
  apiErrors: PropTypes.string,
  resetState: PropTypes.func,
  getVehicles: PropTypes.func,
  getCarModels: PropTypes.func,
  updateRequestObject: PropTypes.func,
};

export default Form;
