import axiosInstance from './axios';

function put(eventName: string, data: any) {
  return axiosInstance.put('/events/', {eventName, data});
}

export default {
  put(eventName: string, data: any) {
    put(eventName, data);
  },
};
