import { NavigateFunction } from "react-router-dom";
import { AppDispatch } from "..";
import { UserAuthListType } from "../../types/types";
import { RoutesName } from "../../utils/routes";
import { setIsLoading, authSucsess, logInError } from "../reducers/authManager";

export const logInAction =
  (login: string, password: string, navigate: NavigateFunction) =>
  async (dispatch: AppDispatch) => {
    try {
      const defaultErrorMessage = `User with name ${login} is not registered`;
      const wrongPasswordMessage = `You entered an invalid password`;
      dispatch(setIsLoading());
      const response = await fetch(`http://localhost:3000/userlist`);
      const result = (await response.json()) as UserAuthListType;
      if (result[login]) {
        if (result[login].password === password) {
          dispatch(authSucsess(login));
          navigate(RoutesName.HOME_PAGE_ROUTE, { replace: true });
        } else dispatch(logInError(wrongPasswordMessage));
      } else dispatch(logInError(defaultErrorMessage));
    } catch {
      dispatch(
        logInError(
          "Oops... some kind of server problem, please try again later"
        )
      );
    }
  };
