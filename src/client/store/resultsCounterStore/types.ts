
export interface CounterState {
    resultGuildName: string
    pelletStorm: number
    checkMage: number
    hiddenLotus: number
}

export const SUBMIT_BUTTON_CLICKED = "SUBMIT_BUTTON_CLICKED";


interface SubmitButtonClicked {
    type: typeof SUBMIT_BUTTON_CLICKED;
    resultGuildName: string;
    pelletStorm: number;
    checkMage: number;
    hiddenLotus: number;
}



export type ActionTypes = SubmitButtonClicked;