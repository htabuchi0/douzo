import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Button, ActivityIndicator, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Emoji from 'react-native-emoji';
import Stars from 'react-native-stars';

import Colors from '../constants/colors';

const RestaurantCard = (props) => {
	const restaurant = props.restaurant;
	const isLoading = props.isLoading;
	const imageSource = { uri: props.restaurant.image_url };
	console.log('RestaurantCard: ', props);

	return (
		<View style={styles.card}>
			{isLoading ? (
				<>
					<View>
						<ActivityIndicator size="large" style={styles.indicator} />
						<Text style={styles.loading}>picking one for you...❤︎</Text>
					</View>
				</>
			) : (
				<>
					<View style={styles.contentContainer}>
						<Text style={styles.name} numberOfLines={1} adjustsFontSizeToFit>
							{restaurant.name}
						</Text>
						<View style={styles.imageContainer}>
							<Image source={imageSource} style={styles.image} resizeMode="contain" />
						</View>
						<View style={styles.textContainer}>
							<Emoji name="world_map" style={styles.text} />
							<Text style={styles.text}>
								: {restaurant.location.address1}, {restaurant.location.city}
							</Text>
						</View>
						<View style={{ alignItems: 'center', flexDirection: 'row' }}>
							<View style={styles.textContainer}>
								<Emoji name="female-judge" style={styles.text} />
								<Text style={styles.text}>: </Text>
								<Stars default={restaurant.rating} spacing={4} starSize={18} count={5} />
							</View>
							<View style={styles.textContainer}>
								<Emoji name="moneybag" style={styles.text} />
								<Text style={styles.text}>: {restaurant.price}</Text>
							</View>
						</View>
					</View>
				</>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	indicator: { marginVertical: hp(25) },
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
	loading: { color: Colors.fontColor, fontSize: 20, alignSelf: 'center', fontWeight: 'bold', marginTop: hp(2) },
	contentContainer: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	name: {
		fontSize: 35,
		color: Colors.fontColor,
		fontWeight: 'bold',
		height: hp(5),
		maxWidth: wp(80),
		marginTop: hp(3),
	},
	text: {
		fontSize: 18,
		color: Colors.fontColor,
	},
	textContainer: {
		flexDirection: 'row',
		alignItems: 'baseline',
		marginVertical: hp(1),
		marginHorizontal: wp(5),
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
});

export default RestaurantCard;
