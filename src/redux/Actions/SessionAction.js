import Store from "../../services/store";
const SESSION_EXPIRED = "SESSION_EXPIRED";
const DUPLICATE_SESSION = "DUPLICATE_SESSION";
const { dispatch } = Store;

export const setSessionExpiredTrue = () => {
  dispatch({
    type: SESSION_EXPIRED,
    payload: true,
  });
};

export const setDuplicateSessionState = (state) => {
  dispatch({
    type: DUPLICATE_SESSION,
    payload: state,
  });
};

export const setSessionExpired = (isSessionExpired) => (dispatch) => {
  // dispatch({
  // 	type: SESSION_EXPIRED,
  // 	payload: isSessionExpired,
  // });
};
