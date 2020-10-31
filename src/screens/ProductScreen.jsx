import React, { useEffect, useCallback, useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { CustomText } from "../components/custom-text/CustomText";
import useProducts from "../hooks/useProducts";
import { visueltProBlack } from "../../contants/fontsConstant";
import { colors } from "../../base-style";
import InfoSVG from "../components/SVG/Info";
import { useSelector, useDispatch } from "react-redux";
import { addToCartAction } from "../../actions/cartActions";

const ProductScreen = ({ route, navigation }) => {
  const [{ isLoading, response, error }, doReaquest] = useProducts();
  const [isProductInCart, setisProductInCart] = useState(false);
  const inCart = useSelector((state) => state.inCart);
  const dispatch = useDispatch();

  useEffect(() => {
    doReaquest("/" + route.params.productId);
  }, []);

  useEffect(() => {
    if (!response) return;
    setisProductInCart(inCart.some(({ id }) => id === response.id));

    return () => setisProductInCart(false);
  }, [response, inCart]);

  const onAddToCart = useCallback((id) => dispatch(addToCartAction({ id })), [
    dispatch,
  ]);

  const ProductIsDisabled = (
    <View style={Style.ProductInfo}>
      <InfoSVG />
      <CustomText
        text={"Товар не доступен к предзаказу"}
        propsStyle={Style.ProductInfoText}
      />
    </View>
  );

  const ButtonAddToCart = (
    <TouchableOpacity
      style={Style.ProductButton}
      onPress={() => onAddToCart(response.id)}
    >
      <CustomText
        text={"Добавить в корзину"}
        propsStyle={Style.ProductButtonText}
      />
    </TouchableOpacity>
  );

  if (!response) return <View></View>;
  return (
    <ScrollView contentContainerStyle={Style.ProductPage}>
      <Image style={Style.ProductImage} source={{ uri: response.img }} />

      <View style={Style.Container}>
        <CustomText
          text={response.name}
          propsStyle={Style.ProductName}
          fontName={visueltProBlack}
        />

        <View style={Style.ProductSubDetail}>
          <CustomText text={"Стоимость"} propsStyle={Style.ProctText} />

          <View style={Style.ProductPartPrice}>
            <CustomText
              text={response.price100}
              propsStyle={[Style.ProductPrice100, Style.ProductText]}
              fontName={visueltProBlack}
            />
            <CustomText
              text={" грн"}
              propsStyle={[Style.ProductCurrency, Style.ProductText]}
              fontName={visueltProBlack}
            />
            <CustomText text={" / 100 г"} propsStyle={Style.ProductText} />
          </View>
        </View>
      </View>

      <View style={Style.ProductBuy}>
        <View>
          <View style={Style.ProductPreorder}>
            <CustomText
              text={"К предзаказу:"}
              propsStyle={Style.ProductText}
              fontName={visueltProBlack}
            />

            <View style={Style.ProductPreorderWeight}>
              <CustomText
                text={response.weight}
                propsStyle={Style.ProductText}
                fontName={visueltProBlack}
              />
              <CustomText text={" г"} />
            </View>
          </View>

          <View style={Style.ProductRow}>
            <CustomText
              text={"~ " + response.price100}
              propsStyle={Style.ProductPrice}
              fontName={visueltProBlack}
            />
            <CustomText
              text={" грн"}
              propsStyle={[Style.ProductText, Style.ProductTextBaseLine]}
              fontName={visueltProBlack}
            />
          </View>
          {response.isAvailable
            ? isProductInCart
              ? null
              : ButtonAddToCart
            : ProductIsDisabled}
        </View>
      </View>
    </ScrollView>
  );
};

const Style = StyleSheet.create({
  Container: {
    width: Dimensions.get("window").width - 48,
  },
  ProductPage: {
    justifyContent: "center",
    alignItems: "center",
  },
  ProductImage: {
    width: Dimensions.get("window").width,
    height: 296,
    marginBottom: 24,
  },
  ProductName: {
    marginBottom: 22,
    paddingRight: 55,
    fontSize: 24,
  },
  ProductSubDetail: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 27,
  },
  ProductPartPrice: {
    flexDirection: "row",
    alignItems: "center",
  },
  ProductText: {
    fontSize: 18,
  },
  ProductBuy: {
    width: "100%",
    paddingHorizontal: 24,
    paddingVertical: 30,
    backgroundColor: "#f7f7f7",
  },
  ProductPreorder: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 13,
  },
  ProductPreorderWeight: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  ProductRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "baseline",
  },
  ProductPrice: {
    fontSize: 32,
  },
  ProductTextBaseLine: {
    lineHeight: 32,
  },
  ProductButton: {
    justifyContent: "center",
    alignItems: "center",
    height: 48,
    marginTop: 40,
    backgroundColor: colors.peach,
    borderWidth: 1,
    borderRadius: 8,
    borderTopColor: colors.peach,
    borderLeftColor: colors.peach,
    borderBottomColor: colors.peach,
    borderRightColor: colors.peach,
  },
  ProductButtonText: {
    color: "#fff",
  },
  ProductInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 32,
  },
  ProductInfoText: {
    marginLeft: 15,
  },
});
export default ProductScreen;
