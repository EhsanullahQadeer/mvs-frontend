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

export async function getLikedSamples(params:any) {
  return axios.get(`${config.defaults.api_url}/sounds/likes` , {params});
}

export async function getSoundSamples(id: any,params:any) {
  return axios.get(`${config.defaults.api_url}/sounds/samples/${id}` , {params});
}

export async function getSampleDownloads(id: any,params:any) {
  return axios.get(`${config.defaults.api_url}/sounds/sample/${id}/downloads` , {params});
}

export async function sampleLike(id: any) {
  return axios.post(`${config.defaults.api_url}/sounds/sample/${id}/like`);
}

export async function sampleUnlike(id: any) {
  return axios.post(`${config.defaults.api_url}/sounds/sample/${id}/unlike`);
}
export async function saveSampleDownload(id: any) {
  return axios.post(`${config.defaults.api_url}/sounds/sample/${id}/download`);
}
