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
import axios from "axios";

import Colors from "../constants/colors";
import { YELP_API_KEY } from "react-native-dotenv";

const BUSINESS_PATH = "https://api.yelp.com/v3/businesses/";

const RestaurantCard = (props) => {
  // console.log("props: ", props);
  // const { {business}, loading } = props;
  console.log("restaurant card: ", props);
  const business = props.business;
  const loading = props.loading;

  const locationComponent = () => {
    return (
      <View>
        <Text>
          Address: {business.location.address1}, {business.location.address2},{" "}
          {business.location.city}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.card}>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <View>
          <Text>{business.name}</Text>
          <View> {locationComponent()} </View>
          <Text>Address: </Text>
        </View>
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

export default RestaurantCard;
