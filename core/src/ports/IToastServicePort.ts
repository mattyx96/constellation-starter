export type Toast = {
  message: string;
  type: "SUCCESS" | "ERROR" | "INFO";
};

export interface IToastServicePort {
  createSuccessToaster: (message: string, type?: Toast["type"]) => void;
}
