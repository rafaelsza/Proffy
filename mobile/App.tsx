import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { AppLoading } from 'expo';
import {
  Archivo_400Regular,
  Archivo_700Bold,
} from '@expo-google-fonts/archivo';
import {
  Poppins_400Regular,
  Poppins_600SemiBold,
  useFonts,
} from '@expo-google-fonts/poppins';

import AppStack from './src/routes/AppStack';

export default function App() {
  const [fontsLoaded] = useFonts({
    Archivo_400Regular,
    Archivo_700Bold,
    Poppins_400Regular,
    Poppins_600SemiBold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  {
    /* eslint-disable react/style-prop-object */
  }
  return (
    <>
      <StatusBar style="light" translucent />
      <AppStack />
    </>
  );
}
