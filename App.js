import React from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import StartScreen from "./screens/StartScreen";
import RestaurantFormScreen from "./screens/Restaurant/RestaurantFormScreen";
import RestaurantSuggestionScreen from "./screens/Restaurant/RestaurantSuggestionScreen";
import RecipeFormScreen from "./screens/Recipe/RecipeFormScreen";
import RecipeSuggestionScreen from "./screens/Recipe/RecipeSuggestionScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={StartScreen} />
        <Stack.Screen name="Restaurant" component={RestaurantFormScreen} />
        <Stack.Screen name="Recipe" component={RecipeFormScreen} />
        <Stack.Screen
          name="Restaurant Suggestion"
          component={RestaurantSuggestionScreen}
        />
        <Stack.Screen
          name="Recipe Suggestion"
          component={RecipeSuggestionScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
