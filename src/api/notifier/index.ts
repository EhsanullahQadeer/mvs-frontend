import axiosInstance from "api/axios";



export type IViewDemoEventParams = {
  mediaId: number;
  recipientId: number;
}
export async function setViewDemo(params: IViewDemoEventParams) {
  return axiosInstance.post("/notifier/view-demo-event", params);
}