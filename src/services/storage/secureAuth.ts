import * as Keychain from 'react-native-keychain';

const SERVICE_TOKEN = 'auth_token';
const SERVICE_PHONE = 'auth_phone';

const getPasscodeService = (phone: string) => `auth_passcode_${phone}`;

// ---------------- TOKEN ----------------
export const saveToken = async (token: string) => {
  await Keychain.setGenericPassword('token', token, {
    service: SERVICE_TOKEN,
  });
};

export const getToken = async (): Promise<string | null> => {
  const credentials = await Keychain.getGenericPassword({
    service: SERVICE_TOKEN,
  });

  if (!credentials) return null;
  return credentials.password;
};

export const clearToken = async () => {
  await Keychain.resetGenericPassword({
    service: SERVICE_TOKEN,
  });
};

// ---------------- PHONE ----------------
export const savePhone = async (phone: string) => {
  await Keychain.setGenericPassword('phone', phone, {
    service: SERVICE_PHONE,
  });
};

export const getPhone = async (): Promise<string | null> => {
  const credentials = await Keychain.getGenericPassword({
    service: SERVICE_PHONE,
  });

  if (!credentials) return null;
  return credentials.password;
};

export const clearPhone = async () => {
  await Keychain.resetGenericPassword({
    service: SERVICE_PHONE,
  });
};

// ---------------- PASSCODE (per account) ----------------
export const savePasscode = async (phone: string, passcode: string) => {
  await Keychain.setGenericPassword(phone, passcode, {
    service: getPasscodeService(phone),
  });
};

export const getPasscode = async (
  phone: string,
): Promise<string | null> => {
  const credentials = await Keychain.getGenericPassword({
    service: getPasscodeService(phone),
  });

  if (!credentials) return null;
  return credentials.password;
};

export const clearPasscode = async (phone: string) => {
  await Keychain.resetGenericPassword({
    service: getPasscodeService(phone),
  });
};