/* eslint-disable */

const initialState = {
  logindata: {},
};

const Login = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_REQUEST":
      return { ...state, logindata: action.data };

    default:
      return state;
  }
};

export default Login;
