# React Native On-Demand Salary App

This is a React Native application built using `@react-native-community/cli`.
The app simulates a fintech product that allows users to check their available salary and withdraw money on demand.

---

# 📱 Features

* Sign in with phone number (OTP)
* Passcode authentication (create / confirm / enter)
* View available balance
* Withdraw salary (up to 50% of available balance)
* View transaction history
* Secure storage for authentication

---

# 🧱 Tech Stack

- React Native CLI (native project structure)
- TypeScript
- Redux Toolkit for state management
- React Hook Form for form handling & validation
- React Navigation (stack + tab navigators)
- react-native-config for environment variables

---


# 📂 Project Structure

```
src/
 ├── assets/         # images, fonts
 ├── components/     # Reusable UI components (CustomButton, CustomInput, etc.)
 ├── config/         # Environment and config helpers
 ├── constants/      # App constants
 ├── navigation/     # Navigation setup (AppNavigator, MainTabNavigator)
 ├── screens/        # Screen components (SignIn, Otp, Home, Withdraw, etc.)
 ├── services/       # API services & secure storage
 ├── store/          # Redux store, slices, thunks
 ├── theme/          # Colors, fonts, typography
 ├── types/          # Shared TypeScript types
 └── utils/          # Small helpers (auth, date, number)
```

Example constants:

* Phone length, passcode length, etc.

---

# ⚙️ Installation

Install dependencies:

```sh
npm install
# or
yarn install
```

---

# 🚀 Getting Started

## Step 1: Start Metro

```sh
npm start
# or
yarn start
```

## Step 2: Run the app

### Android

```sh
npm run android
# or
yarn android
```

### iOS

Install CocoaPods (first time only):

```sh
bundle install
bundle exec pod install
```

Then run:

```sh
npm run ios
# or
yarn ios
```

---

# 🔐 Environment Variables

This project uses environment variables via `react-native-config`.

## Step 1: Create `.env`

```sh
cp .env.example .env
```

## Step 2: Configure values

Example:

```
API_BASE_URL=https://your-api-url.com
```

Used in code via:

```ts
Config.API_BASE_URL
```

---

# 💡 Business Logic

* Users can withdraw **up to 50% of their available balance**
* Withdrawal validation is handled on the client side
* Balance is fetched from backend and stored in global state

---

# 🧠 State Management

* Redux Toolkit is used for global state
* Auth state includes:

  * phone
  * authentication status
  * passcode status
  * available balance
* Form state is handled using React Hook Form

---

# 🎨 Styling

* Centralized color system
* Reusable UI components (Input, Button, Text)
* Clean and consistent design structure

---

# 🧪 Validation

* Phone number must match Thai format (10 digits starting with 0)
* Withdrawal amount must not exceed allowed limit
* Passcode length validation applied

---

# 🔄 Development

* Fast Refresh enabled for instant UI updates
* Full reload:

  * Android: press `R` twice
  * iOS: press `R`

---

# 🛠 Troubleshooting

If you encounter issues, please refer to:
https://reactnative.dev/docs/troubleshooting

---

# 📚 Learn More

* https://reactnative.dev
* https://reactnative.dev/docs/getting-started

---

# ✅ Notes

* Make sure `.env` is configured before running the app
* Ensure all dependencies are installed before starting Metro
* Works on both Android and iOS
