import { CounterState, SUBMIT_BUTTON_CLICKED } from "./types";


export function submitButtonClicked(resultGuildName: string, pelletStorm: number, checkMage: number, hiddenLotus: number){
    return {
        type: SUBMIT_BUTTON_CLICKED,
        resultGuildName: resultGuildName,
        pelletStorm: pelletStorm,
        checkMage: checkMage,
        hiddenLotus: hiddenLotus
    }
}



