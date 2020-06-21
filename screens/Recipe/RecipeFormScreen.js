import React from "react";
import { View, StyleSheet, Text } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import Button from "../../components/Button";
import Colors from "../../constants/colors";

const RecipeFormScreen = (props) => {
  const pressStartHandler = () => {
    props.navigation.navigate("Recipe Suggestion");
  };

  return (
    <View style={styles.buttonContainer}>
      <Button style={styles.startButton} onPress={pressStartHandler}>
        <Text style={styles.startText}>START</Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginVertical: hp(30),
    alignItems: "center",
  },
  startButton: {
    marginTop: 60,
    alignItems: "center",
    width: 250,
    height: 55,
  },
  startText: {
    fontSize: 40,
    fontWeight: "bold",
    color: Colors.fontColor,
  },
});

export default RecipeFormScreen;
