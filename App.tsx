import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import BootSplash from 'react-native-bootsplash';

import AppNavigator from './src/navigation/AppNavigator';
import { store } from './src/store';
import { colors } from './src/theme/colors';

function App() {
  useEffect(() => {
    const init = async () => {
      await BootSplash.hide({ fade: true });
    };

    init();
  }, []);

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