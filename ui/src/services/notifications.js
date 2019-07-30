import { ToastContainer as Container, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const notifications = {
  success(message, opts) {
    toast.success(message, opts);
  },
  error(message, opts) {
    toast.error(message, opts);
  },
  warn(message, opts) {
    toast.warn(message, opts);
  },
  info(message, opts) {
    toast.info(message, opts);
  },
};

export { Container };

export default notifications;
