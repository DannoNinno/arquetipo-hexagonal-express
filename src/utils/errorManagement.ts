export interface CustomError {
  status: number;
  message: string;
  description: string;
}

export function ErrorManagement(
  status: number,
  message: string,
  description: string
): CustomError {
  return {
    status: status,
    message: message,
    description: description
  };
}
