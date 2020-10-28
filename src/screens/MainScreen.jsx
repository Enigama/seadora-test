import React, { useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import useProducts from "../hooks/useProducts";
import axios from "axios";
import { CustomText } from "../components/custom-text/CustomText";
import { InterBold, visueltProBlack } from "../../contants/fontsConstant";
import { TouchableOpacity } from "react-native-gesture-handler";
import { colors } from "../../base-style";

const MainScreen = () => {
  const [{ isLoading, response, error }, doReaquest] = useProducts();

  useEffect(() => {
    console.log("start request");
    doReaquest();
    //console.log(response);
    //axios.get("https://dev2.seadora.com.ua/api/v1/products").then((res) => {
    //console.log(res, "res server");
    //});
  }, []);

  return (
    <ScrollView>
      <CustomText
        text={"Каталог"}
        style={Style.Title}
        fontName={visueltProBlack}
      />
      <View style={Style.Products}>
        {response
          ? response.items.map((item, index) => {
              return (
                <View
                  style={[Style.ProductItem, index !== 0 && { marginTop: 24 }]}
                  key={item.id}
                >
                  <Image
                    style={Style.ProductImage}
                    source={{ uri: item.img }}
                  />
                  <View style={Style.ProductFooter}>
                    <Text style={[Style.ProductName]}>{item.name}</Text>
                    <View style={Style.ProductTextWrapper}>
                      <CustomText
                        text={item.price100}
                        propsStyle={Style.ProductPrice}
                        fontName={visueltProBlack}
                      />
                      <CustomText
                        text={" грн."}
                        propsStyle={Style.ProductCurrency}
                        fontName={visueltProBlack}
                      />
                      <CustomText
                        text={" (100 г)"}
                        propsStyle={Style.ProductWeight}
                      />
                    </View>
                    <TouchableOpacity style={Style.ProductButton}>
                      <CustomText
                        text={"Заказать"}
                        propsStyle={Style.ProductButtonText}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })
          : null}
      </View>
    </ScrollView>
  );
};

const Style = StyleSheet.create({
  Title: {
    marginBottom: 18,
    paddingLeft: 24,
    fontSize: 24,
  },
  Products: {
    justifyContent: "center",
    alignItems: "center",
  },
  ProductImage: {
    width: 312,
    height: 208,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  ProductFooter: {
    paddingTop: 19,
    paddingBottom: 24,
    paddingHorizontal: 24,
    borderWidth: 1,
    borderRadius: 8,
    borderTopWidth: 0,
    borderBottomColor: "rgb(238, 238, 238)",
    borderLeftColor: "rgb(238, 238, 238)",
    borderRightColor: "rgb(238, 238, 238)",
  },
  ProductName: {
    marginBottom: 15,
    fontSize: 18,
    textAlign: "center",
  },
  ProductTextWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    marginBottom: 19,
  },
  ProductPrice: {
    fontSize: 24,
  },
  ProductCurrency: {},
  ProductWeight: {},
  ProductButton: {
    borderRadius: 8,
    paddingVertical: 10,
    backgroundColor: colors.peach,
  },
  ProductButtonText: {
    textAlign: "center",
    color: "#fff",
  },
});

export default MainScreen;
