import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { CustomText } from "../components/custom-text/CustomText";
import { container, colors } from "../../base-style";
import { visueltProBlack } from "../../contants/fontsConstant";
import { AntDesign } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import useProducts from "../hooks/useProducts";

const CartScreen = ({ navigation }) => {
  const [{ isLoading, response, error }, doReaquest] = useProducts();
  const [items, setItems] = useState([]);
  const inCart = useSelector((state) => state.inCart);

  const goToMain = () => {
    navigation.navigate("Home");
  };

  useEffect(() => {
    if (!inCart.length) return;
    inCart.forEach((id) => {
      doReaquest("/" + id);
    });
  }, [inCart]);

  return (
    <View style={Style.Cart}>
      <View style={[container, Style.CartContainer]}>
        <TouchableOpacity onPress={() => goToMain()} style={Style.CartBack}>
          <AntDesign name="arrowleft" size={24} color={colors.theme} />
        </TouchableOpacity>
        <CustomText
          text={"Корзина"}
          propsStyle={Style.CartTitle}
          fontName={visueltProBlack}
        />

        <ScrollView style={{ width: "100%" }}>
          <CustomText text={"List item"} propsStyle={{ height: 201 }} />
          <CustomText text={"List item"} propsStyle={{ height: 200 }} />
          <CustomText text={"List item"} propsStyle={{ height: 200 }} />
          <CustomText text={"List item"} propsStyle={{ height: 100 }} />
          <CustomText text={"List item"} propsStyle={{ height: 100 }} />
          <CustomText text={"List item"} propsStyle={{ height: 100 }} />
          <CustomText text={"List item"} propsStyle={{ height: 100 }} />
        </ScrollView>
      </View>

      <View style={Style.CartFooter}>
        <CustomText text={"Общая тоимость"} fontName={visueltProBlack} />

        <View style={Style.CartTotla}>
          <CustomText text={"3250"} fontName={visueltProBlack} />
          <CustomText text={" грн"} fontName={visueltProBlack} />
        </View>
      </View>
    </View>
  );
};

const Style = StyleSheet.create({
  Cart: {
    flex: 1,
    paddingTop: 26,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  CartContainer: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  CartBack: {
    position: "absolute",
    top: 0,
    left: 24,
  },
  CartTitle: {
    marginBottom: 32,
    fontSize: 24,
  },
  CartFooter: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 22,
    paddingHorizontal: 24,
    backgroundColor: "#f7f7f7",
  },
  CartTotla: {
    flexDirection: "row",
  },
});

export default CartScreen;
