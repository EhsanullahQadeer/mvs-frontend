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

export function getInboxMessages(params:any) {
  return async function (dispatch: Dispatch<any>) {
    try {
      await axios.get(`${config.get('API')}/messenger/get-conversations`, { params }).then((res: any) => {
        console.log(res);
        dispatch({
          type: ActionType.CONVERSATONS_LIST,
          payload: res,
        });
      });
    } catch (error) {
      console.log(error);

      dispatch({
        type: ActionType.CONVERSATONS_LIST_FAILED,
        payload: {
          message: "Unable to get inbox list",
        },
      });
    }
  };
}