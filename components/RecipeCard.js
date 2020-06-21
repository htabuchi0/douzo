import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Button,
  ActivityIndicator,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import Colors from "../constants/colors";

const RecipeCard = (props) => {
  console.log("Recipe card: ", props);

  return (
    <View style={styles.card}>
      {props.isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <Text>{props.recipe.title}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    shadowColor: "black",
    shadowOffset: { width: 1, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.26,
    elevation: 5,
    justifyContent: "space-around",
    backgroundColor: "white",
    borderRadius: 30,
    width: wp(80),
    height: hp(60),
    marginTop: hp(3),
  },
  text: {
    fontSize: 40,
    color: Colors.fontColor,
    fontWeight: "bold",
    marginVertical: 5,
  },
  textCard: {
    fontSize: 30,
    color: Colors.fontColor,
    fontWeight: "bold",
    marginVertical: 5,
  },
});

export default RecipeCard;
