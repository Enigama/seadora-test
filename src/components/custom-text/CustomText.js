import React, { useEffect } from "react";
import { StyleSheet, Text, ActivityIndicator } from "react-native";
import { useFonts } from "@use-expo/font";
import { base } from "../../../constants/fontsConstant";

export const CustomText = ({ text, fontName, propsStyle }) => {
  const [isLoaded] = useFonts({
    InterRegular: require("../../../assets/fonts/InterRegular.ttf"), //base font for all Text component
    InterBold: require("../../../assets/fonts/InterBold.ttf"),
    VisueltProBlack: require("../../../assets/fonts/VisueltProBlack.ttf"),
  });

  //const test = (e) => {
  //console.log(e, "eee");
  //};

  if (!isLoaded) return <ActivityIndicator />;
  return (
    //onLayout={(e) => test(e)}
    <Text
      style={[{ fontSize: 16 }, { fontFamily: fontName || base }, propsStyle]}
    >
      {text}
    </Text>
  );
};

const style = StyleSheet.create({});
