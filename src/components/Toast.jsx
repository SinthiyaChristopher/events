import { useEffect } from "react";

function Toast({ message, onClose }) {
  useEffect(() => {
    if (!message) return;
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [message, onClose]);
  return message ? <div className="toast">{message}</div> : null;
}

export default Toast;
