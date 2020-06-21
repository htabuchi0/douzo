import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Button, ActivityIndicator } from "react-native";
import axios from "axios";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import Colors from "../../constants/colors";
import RecipeCard from "../../components/RecipeCard";

import { SPOONACULAR_API_KEY } from "react-native-dotenv";

const END_POINT = "https://api.spoonacular.com/recipes/complexSearch";

const RecipeSuggestionScreen = (props) => {
  const [isLoading, setLoading] = useState(false);
  const [recipe, setRecipe] = useState({});
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(false);


  // useEffect(() => {
  //   setLoading(true);
  //   setError(false);

  //   axios
  //     .get(END_POINT, {
  //       params: { apiKey: SPOONACULAR_API_KEY, number: 20 },
  //     })
  //     .then((response) => {
  //       console.log("response: ", response);
  //       setRecipes(response.data.results));
  //     })
  //     .then(() => {
  //       let randomRecipe = recipes[Math.floor(Math.random() * recipes.length)];
  //       setRecipe(randomRecipe);
  //       console.log("recipe: ", recipe);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       setError(error);
  //     })
  //     .finally(() => setLoading(false));
  // }, []);

  const fetchRecipes = async () => {
    setError(false);
    setLoading(true);

    try {
      const response = await axios.get(END_POINT, {
        params: {
          apiKey: SPOONACULAR_API_KEY,
          number: 20,
        },
      });
      console.log("response.data.results", response.data.results);
      setRecipes(response.data.results);
      console.log("recipes: ", recipes);

      let randomRecipe = recipes[Math.floor(Math.random() * recipes.length)];
      console.log("randomRecipe: ", randomRecipe);
      setRecipe(randomRecipe);
      console.log("recipe: ", recipe);

      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   fetchRecipes();
  // }, []);

  setTimeout(fetchRecipes, 200);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>How about this?</Text>
      {isLoading? <ActivityIndicator size="large"/>:<RecipeCard recipe={recipe} isLoading={isLoading}></RecipeCard>}
      <View style={styles.tryButton}>
        <Button
          title={isLoading ? "loading recipe..." : "try again"}
          disabled={isLoading}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: wp(5),
    marginTop: hp(3),
    alignItems: "center",
  },
  text: {
    fontSize: 40,
    color: Colors.fontColor,
    fontWeight: "bold",
    marginVertical: 5,
  },
  tryButton: {
    marginVertical: hp(2),
  },
});

export default RecipeSuggestionScreen;
