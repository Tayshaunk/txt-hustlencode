import { AxiosError, AxiosResponse } from "axios";
import { IServerErrorRespone } from "../interfaces/server.interface";
import { openErrorToaster } from "./toast.service";

const DEFAULT_TIME = 3500;

/**
 * This method handles server errors. An danger alert is
 * dispalyed with relevant info
 * @param error
 * @param logout
 */
export const serverErrorHandler = (
  error: AxiosError | any,
  logout: () => void
) => {
  console.log(error.response);
  // check if there is a axios response obj
  if (error.response) {
    // get axios response
    const response: AxiosResponse<IServerErrorRespone> = error.response;

    if (response.status === 403) {
      // clear user session store and local storage
      logout();
      // show error alert
      openErrorToaster(response.data.message, DEFAULT_TIME);
    } else if (response.status === 404) {
      // show error alert
      openErrorToaster("Server Error. Please refresh the page and try again.", DEFAULT_TIME);
    } else {
      // show error alert
      openErrorToaster(response.data.message, DEFAULT_TIME);
    }
  } else {
    // show default error alert
    openErrorToaster(
      "Server Error. Please refresh the page and try again.",
      DEFAULT_TIME
    );
  }
};
