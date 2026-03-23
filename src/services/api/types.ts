export type UserProfileResponse = {
  data: UserProfile;
};

export type UserProfile = {
  uid: string;
  email: string;
  firstname: string;
  lastname: string;
};

export type TransactionItem = {
  uid: string;
  amount: number;
  date: string;
};

export type TransactionResponse = {
  data: {
    available: number;
    transactions: TransactionItem[];
  };
};

export type CommonResponse = {
  success: boolean;
  message: string;
};
