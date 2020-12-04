import React from "react";
import PropTypes from "prop-types";

//Styled Components
import {
  Label,
  FormH1,
  FormMain,
  FormContainer,
  FormWrapper,
} from "../Form/FormElements";

//Components
import SelectField from "../SelectField";

const Models = ({
  stepId,
  nextStep,
  prevStep,
  stepData,
  apiErrors,
  getVehicles,
  requestObject,
  handleChange,
}) => {
  //Handle continue button onClick
  const handleContinue = (e) => {
    e.preventDefault();
    nextStep();
    getVehicles();
  };

  //Handle back button onClick
  const handleBack = (e) => {
    e.preventDefault();
    prevStep();
  };

  return (
    <>
      <FormContainer>
        {apiErrors ? (

          //Add Page404
          <>
            <button onClick={handleBack}>Back</button>
            <p>{apiErrors}</p>
          </>
        ) : stepData && stepData.length === 0 ? (
          <div>
            <p>Ops it looks like we don't have {requestObject.makes} Models in our API.</p>
            <strong>Please choose another Make</strong>
            <br />
            <button onClick={handleBack}>Back</button>
          </div>
        ) : (
          <FormWrapper>
            <FormH1>Choose a Car:</FormH1>
            <FormMain id="multi-step-form" onSubmit={handleContinue}>
              <Label htmlFor="models">{requestObject.makes} Models:</Label>
              <SelectField
                required={true}
                stepId={stepId}
                stepData={stepData}
                requestObject={requestObject.models}
                handleChange={handleChange}
              />
              <br />
              <button form="multi-step-form" type="submit">
                Continue
              </button>
              <br />
              <button onClick={handleBack}>Back</button>
            </FormMain>
          </FormWrapper>
        )}
      </FormContainer>
    </>
  );
};

Models.propTypes = {
  stepId: PropTypes.string,
  nextStep: PropTypes.func,
  apiErrors: PropTypes.string,
  prevStep: PropTypes.func,
  stepData: PropTypes.array,
  getVehicles: PropTypes.func,
  handleChange: PropTypes.func,
  requestObject: PropTypes.object,
};

export default Models;
