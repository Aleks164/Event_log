import { NavigateFunction } from "react-router-dom";
import { AppDispatch } from "..";
import { UserAuthListType } from "../../types/types";
import { RoutesName } from "../../utils/routes";
import { setIsLoading, logInError, authSucsess } from "../reducers/authManager";

export const sigInAction =
  (login: string, password: string, navigate: NavigateFunction) =>
  async (dispatch: AppDispatch) => {
    try {
      const defaultErrorMessage = `User with name ${login} already exist`;
      dispatch(setIsLoading());
      const response = await fetch(`http://localhost:3000/userlist`);
      const result = (await response.json()) as UserAuthListType;
      if (result[login]) dispatch(logInError(defaultErrorMessage));
      else {
        try {
          const newUser = JSON.stringify({
            [login]: {
              id: Date.now(),
              name: login,
              password,
            },
          });
          const registration = await fetch(`http://localhost:3000/userlist/`, {
            headers: {
              "Content-Type": "application/json",
            },
            method: "PATCH",
            body: newUser,
          });
          dispatch(authSucsess(login));
          navigate(RoutesName.HOME_PAGE_ROUTE, { replace: true });
        } catch {
          throw new Error();
        }
      }
    } catch {
      dispatch(
        logInError(
          "Oops... some kind of server problem, please try again later"
        )
      );
    }
  };
