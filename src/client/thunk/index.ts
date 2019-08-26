import { Action } from "redux";
import { ThunkAction } from "redux-thunk";


import { submitButtonClicked } from "../store/resultsCounterStore/actions";


import { AppState } from "../store";


export const submitButtonClickedThunk = (resultGuildName: string, pelletStorm: number, checkMage: number, hiddenLotus: number): ThunkAction<void, AppState, null, Action<string>> => async (dispatch, getState) => {
  console.log("in thunk")
  try {
    dispatch (
      submitButtonClicked(resultGuildName, pelletStorm, checkMage, hiddenLotus)
    )
  }
  catch (err) {
    console.log("ERROR: " + err)
  }

};
