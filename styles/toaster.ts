import { DefaultToastOptions } from "react-hot-toast";

export const toasterStyle: DefaultToastOptions = {
  duration: 5000,
  style: {
    borderRadius: "8px",
    padding: "10px",
    fontSize: "14px",
    fontWeight: 400,
  },
  success: {
    style: {
      background: "#DAF8E6",
      color: "#004434",
    },
  },
  error: {
    style: {
      background: "#FEF3F3",
      color: "#F56060",
    },
  },
}