import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Button as TryButton, ActivityIndicator, Linking, Image } from 'react-native';
import axios from 'axios';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Emoji from 'react-native-emoji';

import Colors from '../../constants/colors';
import RecipeCard from '../../components/RecipeCard';
import Button from '../../components/Button';

import { EDAMAM_APP_ID, EDAMAM_APP_KEY } from 'react-native-dotenv';

const END_POINT = 'https://api.edamam.com/search';

const RecipeSuggestionScreen = (props) => {
	const [isLoading, setLoading] = useState(true);
	const [recipe, setRecipe] = useState({});
	const [recipes, setRecipes] = useState([]);
	const [error, setError] = useState(false);

	const edamamLogo = require('../../assets/edamam_logo.png');

	const openRecipe = () => {
		console.log('url: ', recipe.shareAs);
		Linking.openURL(recipe.shareAs);
	};

	const getRecipes = (response) => {
		const tempRecipes = response.data.hits;
		setRecipes(tempRecipes);
		console.log('recipes: ', tempRecipes);
		return tempRecipes;
	};

	const getRecipe = (recipes) => {
		const randomRecipe = recipes[Math.floor(Math.random() * recipes.length)].recipe;
		setRecipe(randomRecipe);
		console.log('recipe: ', randomRecipe);
		setLoading(false);
		return randomRecipe;
	};

	const fetchRecipes = async () => {
		setError(error);
		setLoading(true);

		try {
			const response = await axios.get(END_POINT, {
				params: {
					q: 'salt',
					app_id: EDAMAM_APP_ID,
					app_key: EDAMAM_APP_KEY,
					to: 20,
				},
			});
			let tempRecipes = getRecipes(response);
			let tempRecipe = getRecipe(tempRecipes);
			setLoading(false);
		} catch (error) {
			console.log(error);
			setError(error);
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchRecipes();
	}, []);

	return (
		<View style={styles.background}>
			<View style={styles.container}>
				<Text style={styles.text}>How about this?</Text>
				<View style={styles.hands}>
					{/* <Emoji name="palms_up_together" style={{ fontSize: 40, transform: [{ rotate: '180deg' }] }} /> */}

					<Emoji name="wave" style={styles.lefthand} />
					<Text style={styles.douzo}> douzo </Text>
					<Emoji name="wave" style={styles.righthand} />
					{/* <Emoji name="palms_up_together" style={{ fontSize: 40, transform: [{ rotate: '180deg' }] }} /> */}
				</View>
				<RecipeCard recipe={recipe} isLoading={isLoading} />
				<Button style={styles.button} onPress={openRecipe}>
					<View style={styles.buttonContainer}>
						<Text style={styles.buttonText}>Open in Edamam </Text>
						<Image source={edamamLogo} style={styles.logo} resizeMode="contain" />
					</View>
				</Button>
				<View style={styles.tryButton}>
					<TryButton
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
		height: hp(100),
	},
	container: {
		marginHorizontal: wp(5),
		marginTop: hp(2),
		alignItems: 'center',
	},
	text: {
		fontSize: 40,
		color: Colors.fontColor,
		fontWeight: 'bold',
		marginVertical: 5,
	},
	logo: {
		width: wp(5),
		height: hp(3),
	},
	tryButton: {
		marginVertical: hp(2),
	},
	buttonText: {
		fontSize: 20,
		fontWeight: 'bold',
		color: Colors.fontColor,
	},
	button: {
		marginTop: hp(4),
		alignItems: 'center',
		width: wp(50),
		height: hp(6),
	},
	buttonContainer: {
		flexDirection: 'row',
	},
	righthand: {
		fontSize: 40,
		transform: [{ rotate: '120deg' }, { rotateY: '180deg' }],
		// marginBottom: hp(2)
	},
	lefthand: {
		fontSize: 40,
		transform: [{ rotate: '60deg' }, { rotateX: '180deg' }, { rotateY: '180deg' }],
		// marginBottom: hp(2)
	},
	hands: {
		flexDirection: 'row',
		marginVertical: hp(2),
		// justifyContent: "space-around"
	},
	douzo: {
		fontSize: 30,
		color: Colors.fontColor,
		fontWeight: 'bold',
		// marginVertical: 5,
	},
});

export default RecipeSuggestionScreen;
