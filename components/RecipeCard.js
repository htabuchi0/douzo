import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Button, ActivityIndicator, Image, FlatList, ScrollView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Emoji from 'react-native-emoji';

import Colors from '../constants/colors';
import { createIconSetFromFontello } from 'react-native-vector-icons';

const RecipeCard = (props) => {
	console.log('Recipe card: ', props);
	const recipe = props.recipe;
	// const [recipe, setRecipe] = useState(props.recipe);
	const image_source = { uri: props.recipe.image };
	const url = props.recipe.shareAs;
	const listIngredients = [];

	const mapToArrayOfObjects = (array) => {
		console.log(array);
		let arrayObjects = array.map((item) => {
			return { item };
		});
		console.log(arrayObjects);
		return arrayObjects;
	};

	// useEffect(() => {
	// 	if (!props.isLoading) {
	// 		mapToArrayOfObjects(recipe.ingredientLines);
	// 	}
	// }, [props.isLoading]);

	return (
		<View style={styles.card}>
			{props.isLoading ? (
				<>
					<View>
						<ActivityIndicator size="large" style={styles.indicator} />
						<Text style={styles.loading}>picking one for you...</Text>
					</View>
				</>
			) : (
				<>
					<View style={styles.contentContainer}>
						<View style={styles.textContainer}>
							<Text style={styles.name} numberOfLines={1} adjustsFontSizeToFit>
								{recipe.label}
							</Text>
						</View>
						<View style={styles.imageContainer}>
							<Image source={image_source} style={styles.image} resizeMode="contain" />
						</View>
						<View style={styles.textContainer}>
							<Emoji name="muscle" style={styles.text} />
							<Text style={styles.text}>: {~~recipe.calories} calories</Text>
						</View>
						<View style={styles.textContainer}>
							<Emoji name="tomato" style={styles.text} />
							<View style={styles.scroll}>
								<ScrollView showsVerticalScrollIndicator>
									<Text style={styles.ingredients}>{recipe.ingredientLines.join('\n')}</Text>
								</ScrollView>
							</View>
						</View>
					</View>
				</>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	card: {
		shadowColor: 'black',
		shadowOffset: { width: 1, height: 2 },
		shadowRadius: 4,
		shadowOpacity: 0.26,
		elevation: 5,
		backgroundColor: 'white',
		borderRadius: 30,
		width: wp(85),
		height: hp(50),
		// marginTop: hp(3),
	},
	textContainer: {
		flexDirection: 'row',
		// alignItems: 'baseline',
		marginVertical: hp(1),
		marginHorizontal: wp(7),
	},
	loading: {
		color: Colors.fontColor,
		fontSize: 20,
		alignSelf: 'center',
		fontWeight: 'bold',
		marginTop: hp(2),
	},
	indicator: { marginTop: hp(25) },
	contentContainer: {
		alignItems: 'center',
	},
	name: {
		fontSize: 35,
		color: Colors.fontColor,
		fontWeight: 'bold',
		maxWidth: wp(80),
		marginTop: hp(3),
	},
	imageContainer: {
		alignItems: 'center',
		overflow: 'hidden',
		marginVertical: hp(2),
	},
	image: {
		width: wp(75),
		height: hp(20),
		borderRadius: 20,
	},
	listContainer: { width: wp(50), height: hp(15) },
	item: {
		backgroundColor: '#f9c2ff',
		padding: 20,
		marginVertical: 8,
		marginHorizontal: 16,
	},
	title: {
		fontSize: 32,
	},
	text: {
		fontSize: 16,
		color: Colors.fontColor,
		// flex: 1,
	},
	ingredients: {
		width: wp(50),
		// height: hp(40),
		fontSize: 16,
		color: Colors.fontColor,
	},
	scroll: {
		width: wp(50),
		height: hp(10),
	},
	infoContainer: {
		marginLeft: wp(15),
	},
});

export default RecipeCard;
