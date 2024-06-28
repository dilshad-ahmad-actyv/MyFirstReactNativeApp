import { View, Text } from "react-native";
import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../../screens/home/Home";
import Register from "../../screens/auth/Register";
import Login from "../../screens/auth/Login";
import { AuthContext } from "../../context/auth.context";
import HeaderMenu from "./HeaderMenu";
import Post from "../../screens/post/Post";
import About from "../../screens/about/About";
import Account from "../../screens/account/Account";

const ScreenMenu = () => {
  // global state
  const [state] = useContext(AuthContext);
  const Stack = createNativeStackNavigator();
  console.log("state==>", state);
  const authenticatedUser = state?.user && state?.idToken;
  console.log("authenticatedUser==>", authenticatedUser);
  return (
    <Stack.Navigator initialRouteName={authenticatedUser ? "Home" : "Login"}>
      {authenticatedUser ? (
        <>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              title: "Full Stack App",
              headerRight: () => <HeaderMenu />,
            }}
          />
          <Stack.Screen
            name="Post"
            component={Post}
            options={{
              headerBackTitle: "Back",
              headerRight: () => <HeaderMenu />,
            }}
          />
          <Stack.Screen
            name="About"
            component={About}
            options={{
              headerBackTitle: "Back",
              headerRight: () => <HeaderMenu />,
            }}
          />
          <Stack.Screen
            name="Account"
            component={Account}
            options={{
              headerBackTitle: "Back",
              headerRight: () => <HeaderMenu />,
            }}
          />
        </>
      ) : (
        <>
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Login" component={Login} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default ScreenMenu;
