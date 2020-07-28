import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Emoji from 'react-native-emoji';

import Button from '../../components/Button';
import Colors from '../../constants/colors';
import MultiChoice from '../../components/MultiChoice';

const RecipeFormScreen = (props) => {
	const [cuisineTypes, setCuisineTypes] = useState({});
	const [mealTypes, setMealTypes] = useState({});

	const cuisineTypeItems = {
		Japanese: 'Japanese',
		Jhinese: 'Chinese',
		Thai: 'Thai',
		Tradamerican: 'Traditional American',
		Mexican: 'Mexican',
		Italian: 'Italian',
		Vietnamese: 'Vietnamese',
	};

	const mealTypeItems = {
		Breakfast: 'Breakfast',
		Lunch: 'Lunch',
		Dinner: 'Dinner',
		Snack: 'Snack',
		Teatime: 'Teatime',
	};

	const pressStartHandler = () => {
		props.navigation.navigate('Recipe Suggestion');
	};

	return (
		<View style={styles.background}>
			<View style={styles.screen}>
				<View style={{ flexDirection: 'row', marginTop: hp(3), alignSelf: 'center' }}>
					<Text style={styles.text}> I am feeling... </Text>
					<Emoji name="thought_balloon" style={styles.emoji} />
				</View>
				<View style={styles.listContainer}>
					<Emoji name="stew" style={styles.emoji} />
					<Text style={styles.text}>: </Text>
					<MultiChoice
						items={mealTypeItems}
						setSelectedItems={setMealTypes}
						// search={true}
						// title={'Meal Type'}
					/>
				</View>
				<View style={styles.listContainer}>
					<Emoji name="stew" style={styles.emoji} />
					<Text style={styles.text}>: </Text>
					<MultiChoice
						items={cuisineTypeItems}
						setSelectedItems={setCuisineTypes}
						// search={true}
						// title={'Cuisine Type'}
					/>
				</View>

				<View style={styles.buttonContainer}>
					<Button style={styles.startButton} onPress={pressStartHandler}>
						<Text style={styles.startText}>START</Text>
					</Button>
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
	buttonContainer: {
		// marginVertical: hp(3),
		alignItems: 'center',
	},
	screen: {
		marginTop: hp(3),
	},
	startButton: {
		marginTop: hp(5),
		alignItems: 'center',
		width: 250,
		height: 55,
	},
	startText: {
		fontSize: 40,
		fontWeight: 'bold',
		color: Colors.fontColor,
	},
	listContainer: {
		marginTop: hp(2),
		marginLeft: wp(15),
		flexDirection: 'row',
	},
	text: {
		fontSize: 40,
		color: Colors.fontColor,
		fontWeight: 'bold',
		// marginTop: hp(),
	},
	emoji: {
		fontSize: 40,
	},
});

export default RecipeFormScreen;
