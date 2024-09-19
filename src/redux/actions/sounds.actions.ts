/*************************************************************************
 * @file sounds.actions.ts
 * @author Zohaib Ahmed
 * @desc Fetches sounds data from the backend.
 * 
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/


import axios from "../../api/axios";
import { config } from "config/ConfigManager";
import { Dispatch } from "react";
import ActionType from "redux/types"

export function getSounds() {
  return async function (dispatch: Dispatch<any>) {
    try {
      await axios.get(`/sounds`).then((res: any) => {
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