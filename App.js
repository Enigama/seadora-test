import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MainScreen from "./src/screens/MainScreen";
import LogoSVG from "./src/components/SVG/Logo";
import { colors } from "./base-style";
import BasketSVG from "./src/components/SVG/Basket";
import api from "./api";
import ProductScreen from "./src/screens/ProductScreen";
import CartScreen from "./src/screens/CartScreen";
import { Provider } from "react-redux";
import store from "./store";
import { CustomText } from "./src/components/custom-text/CustomText";
import { useSelector } from "react-redux";
import { Main, Product, Cart } from "./constants/screensConstant";

const Stack = createStackNavigator();
api();

const Basket = ({ route, navigation }) => {
  const inCart = useSelector((state) => state.inCart);

  const goToCart = (navigation) => {
    navigation.navigate(Cart);
  };

  return (
    <TouchableOpacity
      style={Style.headerButtonBasket}
      onPress={() => goToCart(navigation)}
    >
      <BasketSVG width={Style.headerBasket.width} />
      {inCart.length ? (
        <View style={Style.cartCount}>
          <CustomText text={inCart.length} propsStyle={Style.cartText} />
        </View>
      ) : null}
    </TouchableOpacity>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={({ route, navigation }) => ({
            cardStyle: Style.PagesBcakground,
            headerStyle: Style.header,
            headerLeft: () => <TouchableOpacity></TouchableOpacity>,
            headerTitle: () => (
              <TouchableOpacity
                style={Style.headerTitle}
                onPress={() => navigation.navigate(Main)}
              >
                <LogoSVG width={47} />
              </TouchableOpacity>
            ),

            headerRight: (e) => (
              <Basket route={route} navigation={navigation} />
            ),
          })}
        >
          <Stack.Screen name={Main} component={MainScreen} />
          <Stack.Screen name={Product} component={ProductScreen} />
          <Stack.Screen name={Cart} component={CartScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const Style = StyleSheet.create({
  PagesBcakground: {
    backgroundColor: "#fff",
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
    position: "relative",
    paddingVertical: 6,
    paddingHorizontal: 24,
  },
  cartCount: {
    position: "absolute",
    top: -3,
    right: 12,
    justifyContent: "center",
    alignItems: "center",
    width: 18,
    height: 18,
    borderRadius: 10,
    backgroundColor: colors.peach,
  },
  cartText: {
    fontSize: 12,
    color: "#fff",
  },
});
