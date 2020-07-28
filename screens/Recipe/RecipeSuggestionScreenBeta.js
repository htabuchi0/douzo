import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Button, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import Colors from '../../constants/colors';
import RecipeCard from '../../components/RecipeCard';

import { SPOONACULAR_API_KEY } from 'react-native-dotenv';

const END_POINT = 'https://api.spoonacular.com/recipes/complexSearch';

const RecipeSuggestionScreen = (props) => {
	// const [isLoading, setLoading] = useState(true);
	// const [recipe, setRecipe] = useState({});
	const [ recipes, setRecipes ] = useState([]);
	const [ error, setError ] = useState(false);

	const [ isLoading, setLoading ] = useState(false);
	const [ recipe, setRecipe ] = useState({
		id: 995889,
		image: 'https://spoonacular.com/recipeImages/995889-312x231.jpg',
		imageType: 'jpg',
		title: 'Low Calorie Peanut Butter Banana Spinach Smoothie'
	});

	const getRecipes = (response) => {
		const tempRecipes = response.data.results;
		setRecipes(tempRecipes);
		return tempRecipes;
	};

	const getRecipe = (recipes) => {
		const randomRecipe = recipes[Math.floor(Math.random() * recipes.length)];
		setRecipe(randomRecipe);
		return randomRecipe;
	};

	const fetchRecipes = async () => {
		setError(error);
		setLoading(true);

		try {
			const response = await axios.get(END_POINT, {
				headers: {
					apiKey: SPOONACULAR_API_KEY,
					number: 30
				}
			});
			let tempRecipes = getRecipes(response);
			let tempRecipe = getRecipe(tempRecipes);
			setLoading(true);
		} catch (error) {
			console.log(error);
			setError(error);
			setLoading(false);
		}
	};

	// useEffect(() => {
	//   fetchRecipes();
	// }, []);

	return (
		<View style={styles.background}>
			<View style={styles.container}>
				<Text style={styles.text}>How about this?</Text>
				{isLoading ? <ActivityIndicator size="large" /> : <RecipeCard recipe={recipe} isLoading={isLoading} />}
				<View style={styles.tryButton}>
					<Button
						title={isLoading ? 'loading recipe...' : 'try again'}
						disabled={isLoading}
						onPress={() => {
							getRecipe(recipes);
						}}
					/>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	background: {
		backgroundColor: '#FFFF',
		width: wp(100),
		height: hp(100)
	},
	container: {
		marginHorizontal: wp(5),
		marginTop: hp(3),
		alignItems: 'center'
	},
	text: {
		fontSize: 40,
		color: Colors.fontColor,
		fontWeight: 'bold',
		marginVertical: 5
	},
	tryButton: {
		marginVertical: hp(2)
	}
});

export default RecipeSuggestionScreen;
