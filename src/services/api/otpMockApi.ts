import { CommonResponse } from "./types";

export const sendOtpMock = async (phone: string): Promise<CommonResponse> => {
  await new Promise<void>(resolve => setTimeout(resolve, 600));

  if (phone.endsWith('0')) {
    return {
      success: false,
      message: 'SEND_OTP_FAILED',
    };
  }

  return {
    success: true,
    message: 'OTP_SENT',
  };
};