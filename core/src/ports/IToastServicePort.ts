export type Toast = {
  message: string;
  type: "SUCCESS" | "ERROR" | "INFO";
};

export interface IToastServicePort {
  createToast: (message: string, type?: Toast["type"]) => void;
}
