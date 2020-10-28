import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MainScreen from "./src/screens/MainScreen";
import LogoSVG from "./src/components/SVG/Logo";
import { colors } from "./base-style";
import BasketSVG from "./src/components/SVG/Basket";
import api from "./api";

const Stack = createStackNavigator();
console.log(colors.theme, "theme color");

api();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={({ navigation }) => ({
          cardStyle: Style.PagesPhone,
          headerStyle: Style.header,
          headerLeft: () => <TouchableOpacity></TouchableOpacity>,
          headerTitle: () => (
            <TouchableOpacity
              style={Style.headerTitle}
              onPress={() => navigation.navigate("Home")}
            >
              <LogoSVG width={47} />
            </TouchableOpacity>
          ),

          headerRight: () => (
            <TouchableOpacity style={Style.headerButtonBasket}>
              <BasketSVG width={Style.headerBasket.width} />
            </TouchableOpacity>
          ),
        })}
      >
        <Stack.Screen name="Home" component={MainScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const Style = StyleSheet.create({
  PagesPhone: {
    backgroundColor: "#f5f5f5",
  },
  container: {
    flex: 1,
  },
  headerTitle: {
    alignSelf: "center",
  },
  header: {
    backgroundColor: colors.theme,
  },
  headerBasket: {
    width: 18,
  },
  headerButtonBasket: {
    paddingVertical: 6,
    paddingHorizontal: 24,
  },
});
