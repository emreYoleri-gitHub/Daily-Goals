import * as userTypes from "../Types/userTypes";

const initialState = {
  currentUser: null,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case userTypes.SIGN_IN_SUCCESS:
      localStorage.setItem("user", JSON.stringify({
        email: action.payload.email,
        password: action.payload.password,
      }));

      return {
        ...state,
        currentUser: action.payload,
        error: null,
      };

    case userTypes.SIGN_IN_FAIL:
      return {
        ...state,
        currentUser: null,
        error: action.payload,
      };

    case userTypes.SIGN_UP_SUCCESS:
      localStorage.setItem(
        "user",
        JSON.stringify({
          email: action.payload.email,
          password: action.payload.password,
        })
      );

      return {
        ...state,
        currentUser: action.payload,
        error: null,
      };

    case userTypes.SIGN_UP_FAIL:
      return {
        ...state,
        currentUser: null,
        error: action.payload,
      };

    case userTypes.SIGN_OUT_SUCCESS:
      localStorage.removeItem("user");
      return {
        ...state,
        currentUser: null,
        error: null,
      };

    case userTypes.SIGN_OUT_FAIL:
      return {
        ...state,
        currentUser: null,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;
