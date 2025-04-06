import axiosInstance from "api/axios";



export type IViewDemoEventParams = {
  audioMediaId: number;
  recipientId: number;
}

export async function setViewDemo(params: IViewDemoEventParams) {
  return axiosInstance.post("/messenger/view-demo-event", params);
}

export async function toggleNotificationAsRead(id?: number) {
  return axiosInstance.post(`/notifier/toggle-read/${id}`);
}

export async function toggleMuteNotification() {
  return axiosInstance.post("/users/toggle-mute-notifications");
}