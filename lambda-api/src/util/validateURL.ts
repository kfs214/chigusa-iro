import { errorType } from "@/consts/errorType";

export const validateURL = (url: string) => {
  try {
    // eslint-disable-next-line no-new
    new URL(url);
  } catch {
    console.error(errorType.endpointUrlInvalid.errorMessage);
    throw new Error(errorType.endpointUrlInvalid.type);
  }
};
