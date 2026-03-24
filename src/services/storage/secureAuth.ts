import * as Keychain from 'react-native-keychain';

const SERVICE_TOKEN = 'auth_token';
const SERVICE_PHONE = 'auth_phone';

const getPasscodeService = (phone: string) => `auth_passcode_${phone}`;

// ---------------- TOKEN ----------------
export const saveToken = async (token: string) => {
  try {
    await Keychain.setGenericPassword('token', token, {
      service: SERVICE_TOKEN,
    });
  } catch (error) {
    console.error('saveToken error:', error);
  }
};

export const getToken = async (): Promise<string | null> => {
  try {
    const credentials = await Keychain.getGenericPassword({
      service: SERVICE_TOKEN,
    });

    if (!credentials) return null;
    return credentials.password;
  } catch (error) {
    console.error('getToken error:', error);
    return null;
  }
};

export const clearToken = async () => {
  try {
    await Keychain.resetGenericPassword({
      service: SERVICE_TOKEN,
    });
  } catch (error) {
    console.error('clearToken error:', error);
  }
};

// ---------------- PHONE ----------------
export const savePhone = async (phone: string) => {
  try {
    await Keychain.setGenericPassword('phone', phone, {
      service: SERVICE_PHONE,
    });
  } catch (error) {
    console.error('savePhone error:', error);
  }
};

export const getPhone = async (): Promise<string | null> => {
  try {
    const credentials = await Keychain.getGenericPassword({
      service: SERVICE_PHONE,
    });

    if (!credentials) return null;
    return credentials.password;
  } catch (error) {
    console.error('getPhone error:', error);
    return null;
  }
};

export const clearPhone = async () => {
  try {
    await Keychain.resetGenericPassword({
      service: SERVICE_PHONE,
    });
  } catch (error) {
    console.error('clearPhone error:', error);
  }
};

// ---------------- PASSCODE (per account) ----------------
export const savePasscode = async (phone: string, passcode: string) => {
  try {
    await Keychain.setGenericPassword(phone, passcode, {
      service: getPasscodeService(phone),
    });
  } catch (error) {
    console.error('savePasscode error:', error);
  }
};

export const getPasscode = async (
  phone: string,
): Promise<string | null> => {
  try {
    const credentials = await Keychain.getGenericPassword({
      service: getPasscodeService(phone),
    });

    if (!credentials) return null;
    return credentials.password;
  } catch (error) {
    console.error('getPasscode error:', error);
    return null;
  }
};

export const clearPasscode = async (phone: string) => {
  try {
    await Keychain.resetGenericPassword({
      service: getPasscodeService(phone),
    });
  } catch (error) {
    console.error('clearPasscode error:', error);
  }
};

// ---------------- CLEAR ALL AUTH ----------------
export const clearAuth = async () => {
  try {
    const phone = await getPhone();

    await Promise.all([
      clearToken(),
      clearPhone(),
      phone ? clearPasscode(phone) : Promise.resolve(),
    ]);
  } catch (error) {
    console.error('clearAuth error:', error);
  }
};