import * as goalTypes from "../Types/goalTypes";
import * as API from "../../Axios/index";

export const createGoalProgram = (programData) => dispatch => {
    try {
        const { data } = API.createGoalProgram(programData)
        dispatch({
            type: goalTypes.CREATE_GOAL_PROGRAM_SUCCESS,
            paylaod: data
        })
    } catch (error) {
        dispatch({
            type: goalTypes.CREATE_GOAL_PROGRAM_FAIL,
            payload: error.message,
        });
    }
}