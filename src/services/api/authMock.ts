export const sendOtpMock = async (phone: string) => {
  // simulate network delay
  await new Promise<void>(resolve => setTimeout(resolve, 600));

  // deterministic fail for test phone numbers ending with 0
  if (phone.endsWith('0')) {
    throw new Error('SEND_OTP_FAILED');
  }

  return {
    success: true,
    message: 'OTP_SENT',
  };
};