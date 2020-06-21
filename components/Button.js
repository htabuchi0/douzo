import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";

const Button = (props) => {
  return (
    <TouchableOpacity
      style={{ ...styles.button, ...props.style }}
      accessibilityRole="button"
      onPress={props.onPress}
    >
      <View>{props.children}</View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    shadowColor: "black",
    shadowOffset: { width: 1, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.26,
    elevation: 5,
    justifyContent: "space-around",
    backgroundColor: "white",
    borderRadius: 30,
  },
});

export default Button;
