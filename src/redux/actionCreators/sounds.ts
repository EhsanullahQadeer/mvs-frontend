import axios from "util/axios";
import config from "config/config";
import { Dispatch } from "react";
import ActionType from "redux/actionTypes";

export function getSounds() {
  return async function (dispatch: Dispatch<any>) {
    try {
      await axios.get(`${config.defaults.api_url}/sounds`).then((res: any) => {
        console.log(res);
        dispatch({
          type: ActionType.GET_SOUNDS,
          payload: res,
        });
      });
    } catch (error) {
      console.log(error);

      dispatch({
        type: ActionType.GET_SOUNDS_FAIL,
        payload: {
          message: "Unable to get sounds",
        },
      });
    }
  };
}

export async function getSound(id: any) {
  return axios.get(`${config.defaults.api_url}/sounds/${id}`);
}