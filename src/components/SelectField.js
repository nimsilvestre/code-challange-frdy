import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { Input, Option } from "./Form/FormElements";

const SelectedField = ({
  stepId,
  stepData,
  required,
  requestObject,
  handleChange,
}) => {
  const [selectedOption, setSelectedOption] = useState([]);

  const handleSelect = (e) => {
    e.preventDefault();
    let selectedItems = e.target.selectedOptions;
    handleChange(e);

    const options = [];

    for (let i = 0; i < selectedItems.length; i++) {
      options.push(selectedItems[i].value);
    }
    setSelectedOption(options);
  };

  //Set Selected
  const handleChangeState = (selectOptions) => {
    setSelectedOption(selectOptions);
  };

  useEffect(() => {
    let arrayOff = [];
    if (requestObject) {
      arrayOff.push(requestObject);
    }
    if (arrayOff.length > 0) {
      handleChangeState(arrayOff);
    }
  }, [requestObject]);

  return (
    <>
      <div>
        <Input
          id={stepId}
          name={stepId}
          multiple={true}
          value={selectedOption}
          onChange={(e) => handleSelect(e)}
          required={required ? required : null}
        >
          {Array.isArray(stepData)
            ? stepData.map((data, i) => {
                return (
                  <Option key={i} value={data}>
                    {data}
                  </Option>
                );
              })
            : null}
        </Input>
      </div>
    </>
  );
};

SelectedField.propTypes = {
  stepId: PropTypes.string.isRequired,
  stepData: PropTypes.array,
  required: PropTypes.bool.isRequired,
  requestObject: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
};

export default SelectedField;
