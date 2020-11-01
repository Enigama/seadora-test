import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";
import useProducts from "../hooks/useProducts";
import { CustomText } from "../components/custom-text/CustomText";
import { visueltProBlack } from "../../constants/fontsConstant";
import { TouchableOpacity } from "react-native-gesture-handler";
import { colors } from "../../base-style";
import { Product } from "../../constants/screensConstant";

const MainScreen = ({ navigation }) => {
  const [{ response, items }, doReaquest] = useProducts();

  useEffect(() => {
    doReaquest();
  }, []);

  const showMore = () => {
    doReaquest("?page=" + (response.current_page + 1));
  };

  const goToProduct = (id) => {
    navigation.navigate(Product, {
      productId: id,
    });
  };

  return (
    <ScrollView style={Style.Product}>
      <CustomText
        text={"Каталог"}
        propsStyle={Style.Title}
        fontName={visueltProBlack}
      />
      {response ? (
        <View>
          <View style={Style.Products}>
            {items.length
              ? items.map((item) => {
                  return (
                    <View style={[Style.ProductItem]} key={item.id}>
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
                        <TouchableOpacity
                          onPress={() => goToProduct(item.id)}
                          style={Style.ProductButton}
                        >
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

          {response.current_page !== response.last_page ? (
            <View style={Style.ButtonWrapper}>
              <TouchableOpacity
                style={Style.ButtonMore}
                onPress={() => showMore()}
              >
                <CustomText
                  text={"Показать еще"}
                  propsStyle={Style.ButtonText}
                />
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
      ) : null}
    </ScrollView>
  );
};

const Style = StyleSheet.create({
  Product: {
    paddingHorizontal: 24,
  },
  Title: {
    marginTop: 25,
    marginBottom: 18,
    fontSize: 24,
    lineHeight: 24,
  },
  Products: {
    justifyContent: "center",
    alignItems: "center",
  },
  ProductItem: {
    marginBottom: 24,
  },
  ProductImage: {
    width: Dimensions.get("window").width - 48,
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
    alignItems: "baseline",
    marginBottom: 19,
  },
  ProductPrice: {
    fontSize: 24,
  },
  ProductCurrency: {
    lineHeight: 24,
  },
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
  ButtonWrapper: {
    //marginTop: 24,
    marginBottom: 32,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  ButtonMore: {
    width: 200,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 8,
    borderTopColor: colors.theme,
    borderLeftColor: colors.theme,
    borderBottomColor: colors.theme,
    borderRightColor: colors.theme,
  },
  ButtonText: {
    color: colors.theme,
  },
});

export default MainScreen;
