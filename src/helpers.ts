import { toast } from 'react-toastify';

export enum NotificationTypes {
  Success = 'success',
  Info = 'info',
  Error = 'error',
}
export const notify = (msg: string, type: NotificationTypes) => {
  toast[type](msg, {
    autoClose: 50000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
  });
};