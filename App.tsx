import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import BootSplash from 'react-native-bootsplash';

import AppNavigator from './src/navigation/AppNavigator';
import { store } from './src/store';
import { hydrateAuthFromStorage } from './src/store/thunks/authThunks';
import { colors } from './src/theme/colors';

function App() {
  const [rehydrated, setRehydrated] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        await store.dispatch(hydrateAuthFromStorage() as any);
      } finally {
        await BootSplash.hide({ fade: true });
        setRehydrated(true);
      }
    };

    init();
  }, []);

  if (!rehydrated) return null;

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}

export default App;