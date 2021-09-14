import * as userTypes from "../Types/userTypes";
import * as API from "../../Axios/index";

export const signIn =
  ({ password, email }) =>
  async (dispatch) => {
    try {
      const { data } = await API.signIn({ email, password });
      dispatch({
        type: userTypes.SIGN_IN_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: userTypes.SIGN_IN_FAIL,
        payload: error.message,
      });
    }
  };

export const signUp = (userData) => async (dispatch) => {
  try {
    const { data } = await API.signUp(userData);
    dispatch({
      type: userTypes.SIGN_UP_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: userTypes.SIGN_UP_FAIL,
      payload: error.message,
    });
  }
};

export const signOut = (id) => async (dispatch) => {
  try {
    const { message } = await API.signOut(id);
    dispatch({
      type: userTypes.SIGN_OUT_SUCCESS,
      payload: message,
    });
  } catch (error) {
    dispatch({
      type: userTypes.SIGN_OUT_FAIL,
      payload: error.message,
    });
  }
};
