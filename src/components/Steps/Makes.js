import React from "react";
import PropTypes from "prop-types";

//Components
import {
  FormContainer,
  FormWrapper,
  FormH1,
  FormMain,
  Label,
} from "../Form/FormElements";
import SelectField from "../SelectField";

const Makes = ({
  stepId,
  stepData,
  nextStep,
  apiErrors,
  handleChange,
  getCarModels,
  requestObject,
  restartSteps,
}) => {
  //Handle button onClick
  const handleContinue = (e) => {
    e.preventDefault();
    getCarModels();
    nextStep();
  };

  
  return (
    <>
      <FormContainer>
        {apiErrors ? (
          //Add Page404
          <div>
            <p>{apiErrors}</p>
            <button onClick={() => restartSteps()}>Start Over</button>
          </div>
        ) : (
          <FormWrapper>
            <FormH1>Choose a Car:</FormH1>
            <FormMain id="multi-step-form" onSubmit={handleContinue}>
              <Label htmlFor={stepId}>Makes:</Label>
              <SelectField
                stepId={stepId}
                required={true}
                stepData={stepData}
                nextStep={nextStep}
                handleChange={handleChange}
                getCarModels={getCarModels}
                requestObject={requestObject.makes}
              />
              <br />
              <button form="multi-step-form" type="submit">
                Continue
              </button>
            </FormMain>
          </FormWrapper>
        )}
      </FormContainer>
    </>
  );
};

Makes.propTypes = {
  stepId: PropTypes.string,
  stepData: PropTypes.array,
  nextStep: PropTypes.func,
  prevStep: PropTypes.func,
  getCarModels: PropTypes.func,
  handleChange: PropTypes.func,
  requestObject: PropTypes.object,
};

export default Makes;
