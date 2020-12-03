//React
import React, { useEffect, useState } from "react";

//Redux
import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMakesFromApi,
  fetchModelsFromApi,
  fetchVehiclesFromApi,
} from "./features/car/carSlice";

//lodash
import set from "lodash.set";
import foreach from "lodash.foreach";
import clonedeep from "lodash.clonedeep";

//Components
import Form from "./components/Form";

/**
 *
 *
 * @return {*}
 */
const App = () => {
  const dispatch = useDispatch();

  const { makes, models, vehicles, status, apiErrors } = useSelector(
    (state) => state.cars
  );
  const initialState = {};

  const [requestObject, setRequestObject] = useState(initialState);
  const [errorFetchedChecker, setErrorFetchedChecker] = useState(0);
  const [otherErrorFetchedChecker, setotherOrrorFetchedChecker] = useState(0);
  const [modelErrorFetchedChecker, setmodelErrorFetchedChecker] = useState(0);

  /**
   * function description
   *
   * @param {*} updates
   */
  const updateRequestObject = (updates) => {
    const clonedRequestObject = clonedeep(requestObject);
    foreach(updates, (update) => {
      const name = update.name;
      const value = update.value;
      set(clonedRequestObject, name, value);
    });
    setRequestObject(clonedRequestObject);
  };


  const resetState = () => {
    setRequestObject(initialState);
  };

  /**
   * fn descript
   *
   */
  const getCarModels = () => {
    if (requestObject.makes) {
      dispatch(fetchModelsFromApi(requestObject.makes))
        .then(() => {
          //set loading status
        })
        .catch((serializedError) => {
          setotherOrrorFetchedChecker(modelErrorFetchedChecker + 1);
        });
    }
  };

  /**
   * fn descript
   *
   */
  const getVehicles = () => {
    if (requestObject.makes && requestObject.models) {
      if (requestObject.models.length > 0) {
        let queryParams = {
          make: requestObject.makes,
          model: requestObject.models,
        };

        dispatch(fetchVehiclesFromApi(queryParams))
          .then(unwrapResult)
          .then(() => {
            //set loading status
          })
          .catch((serializedError) => {
            setotherOrrorFetchedChecker(otherErrorFetchedChecker + 1);
          });
      }
    }
  };

  useEffect(() => {
    if (errorFetchedChecker < 3) {
      dispatch(fetchMakesFromApi())
        .then(unwrapResult)
        .then(() => {
          //set loading status
        })
        .catch((serializedError) => {
          //Handle api errors + 503 re-try api fetch
          setErrorFetchedChecker(errorFetchedChecker + 1);
        });
    }
  }, [dispatch, errorFetchedChecker]);

  useEffect(() => {
    if (modelErrorFetchedChecker < 3) {
      let queryParams = requestObject.makes;

      dispatch(fetchVehiclesFromApi(queryParams))
        .then(unwrapResult)
        .then(() => {
          //set loading status
        })
        .catch((serializedError) => {
          setmodelErrorFetchedChecker(modelErrorFetchedChecker + 1);
        });
    }
  }, [dispatch, modelErrorFetchedChecker]);

  return (
    <>
      <Form
        requestObject={requestObject}
        status={status}
        makes={makes}
        models={models}
        vehicles={vehicles}
        apiErrors={apiErrors}
        getCarModels={getCarModels}
        getVehicles={getVehicles}
        updateRequestObject={updateRequestObject}
        resetState={resetState}
      />
    </>
  );
};

export default App;
