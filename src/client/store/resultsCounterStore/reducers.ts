import {
  CounterState,
  SUBMIT_BUTTON_CLICKED,
  ActionTypes,
} from "./types";

const initialState: CounterState = {
  resultGuildName: "hiddenlotus",
  pelletStorm: 0,
  checkMage: 0,
  hiddenLotus: 0
};

export function reducer(
  state = initialState,
  action: ActionTypes
): CounterState {
  switch (action.type) {
    case SUBMIT_BUTTON_CLICKED:
      console.log("hi: " + action.resultGuildName)
      return {
        ...state,
        resultGuildName: action.resultGuildName,
        pelletStorm: action.pelletStorm,
        checkMage: action.checkMage,
        hiddenLotus: action.hiddenLotus
      }
    default:
      return state;
  }
}



