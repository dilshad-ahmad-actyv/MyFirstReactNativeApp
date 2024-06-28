import { View, Text } from "react-native";
import React from "react";
import AuthProvider from "./context/auth.context";
import ScreenMenu from "./components/Menu/ScreenMenu";

const RootNavigation = () => {
  return (
    <AuthProvider>
      <ScreenMenu />
    </AuthProvider>
  );
};

export default RootNavigation;
