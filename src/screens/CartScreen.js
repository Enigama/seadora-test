import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacityBase,
} from "react-native";
import { CustomText } from "../components/custom-text/CustomText";
import { container, colors } from "../../base-style";
import { visueltProBlack } from "../../contants/fontsConstant";
import { AntDesign, EvilIcons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCartAction } from "../../actions/cartActions";
import { API_URL_PRODUCTS } from "../../contants/requestContstant";
import axios from "axios";

const CartScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState([]);
  const inCart = useSelector((state) => state.inCart);
  const dispatch = useDispatch();

  const goToMain = () => {
    navigation.navigate("Home");
  };

  const removeProduct = useCallback((id) => {
    dispatch(removeFromCartAction(id), [dispatch]);
    setItems(items.filter((product) => product.id !== id));
  });

  useEffect(() => {
    setIsLoading(true);
    const promises = [];
    inCart.forEach(({ id }) => {
      promises.push(axios.get(API_URL_PRODUCTS + "/" + id));
    });

    Promise.all(promises)
      .then((res) => {
        res.forEach(({ data }) => setItems((prev) => [...prev, data.data]));
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  }, []);

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

        {!isLoading && items.length ? (
          <FlatList
            style={{ width: "100%" }}
            data={items}
            keyExtractor={(item) => item.name}
            renderItem={(product) => {
              const { item, index } = product;

              return (
                <View
                  style={[
                    Style.CartItem,
                    index > 0 ? Style.CartItemNext : null,
                  ]}
                >
                  <View>
                    <Image source={{ uri: item.img }} style={Style.CartImage} />
                  </View>
                  <View style={Style.CartRight}>
                    <View style={[Style.CartRow]}>
                      <CustomText
                        text={item.name}
                        fontName={visueltProBlack}
                        propsStyle={[Style.CartItemName]}
                      />
                      <TouchableOpacity
                        style={Style.CartRemove}
                        onPress={() => removeProduct(item.id)}
                      >
                        <EvilIcons
                          name="close"
                          size={24}
                          color={Style.CartRemoveIcon.color}
                        />
                      </TouchableOpacity>
                    </View>

                    <View style={[Style.CartRow]}>
                      <CustomText text={"Вес"} />
                      <CustomText text={item.weight + " г"} />
                    </View>

                    <View style={[Style.CartRow, { marginBottom: 0 }]}>
                      <CustomText text={"Сумма"} />
                      <CustomText text={item.price + " грн"} />
                    </View>
                  </View>
                </View>
              );
            }}
          ></FlatList>
        ) : (
          <View>
            <CustomText text={"Empty basket"} />
          </View>
        )}
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

  CartItem: {
    flexDirection: "row",
    paddingBottom: 20,
  },
  CartItemNext: {
    paddingTop: 23,
    borderTopWidth: 1,
    borderTopColor: "#eeee",
  },
  CartImage: {
    width: 72,
    height: 48,
    borderRadius: 8,
    marginRight: 16,
  },
  CartRight: {
    flex: 1,
  },
  CartRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  CartItemName: {
    maxWidth: 192,
    fontSize: 14,
  },
  CartRemove: {
    marginBottom: 8,
  },
  CartRemoveIcon: {
    color: "#979797",
  },
});

export default CartScreen;
