import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import Colors from "../constants/colors";
import Button from "../components/Button";

const StartScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Help me choose</Text>
      <View style={styles.buttons}>
        <Button
          style={styles.buttonContainer}
          onPress={() => props.navigation.navigate("Restaurant")}
        >
          <Text style={styles.buttonText}>Restaurant</Text>
        </Button>
        <Button
          style={styles.buttonContainer}
          onPress={() => props.navigation.navigate("Recipe")}
        >
          <Text style={styles.buttonText}>Recipe</Text>
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    marginHorizontal: 30,
    marginTop: 100,
    alignItems: "center",
  },
  title: {
    position: "absolute",
    marginVertical: 130,
    fontWeight: "bold",
    fontSize: 48,
    color: Colors.fontColor,
  },
  buttons: {
    marginVertical: 225,
    alignItems: "center",
  },
  buttonContainer: {
    marginVertical: 10,
    alignItems: "center",
    marginTop: 10,
    width: wp(50),
    height: hp(8),
  },
  buttonText: {
    fontSize: 30,
    fontWeight: "bold",
    color: Colors.fontColor,
  },
});

export default StartScreen;
