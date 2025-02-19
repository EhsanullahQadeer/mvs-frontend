import axiosInstance from "api/axios";



export type IViewDemoEventParams = {
  audioMediaId: number;
  recipientId: number;
}
export async function setViewDemo(params: IViewDemoEventParams) {
  return axiosInstance.post("/messenger/view-demo-event", params);

}