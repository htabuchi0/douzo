import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ActivityIndicator, Button as TryButton, Image, Linking } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import axios from 'axios';
import Emoji from 'react-native-emoji';

// import Button from "../../components/Button";
import Colors from '../../constants/colors';
import RestaurantCard from '../../components/RestaurantCard';
import Button from '../../components/Button';

import { YELP_API_KEY } from 'react-native-dotenv';

const YELP_SEARCH_PATH = 'https://api.yelp.com/v3/businesses/search';
const TEXT_LENGTH = 40;
const TEXT_HEIGHT = 14;
const OFFSET = TEXT_LENGTH / 2 - TEXT_HEIGHT / 2;

const RestaurantSuggestionScreen = (props) => {
	const [isLoading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [restaurants, setRestaurants] = useState([]);
	const [restaurant, setRestaurant] = useState({});

	const { latitude, longitude, radius, stars, categories } = props.route.params;
	console.log('restaurant suggestion screen: ', props);

	const yelpLogo = require('../../assets/burst_icon.png');

	const getRestaurants = (response) => {
		const tempRestaurants = response.data.businesses;
		if (tempRestaurants.length) {
			setRestaurants(tempRestaurants);
			return tempRestaurants;
		}
	};

	const getRestaurant = (restaurants) => {
		setLoading(true);
		const randomRestaurant = restaurants[Math.floor(Math.random() * restaurants.length)];
		setRestaurant(randomRestaurant);
		setLoading(false);
		return randomRestaurant;
	};

	const fetchRestaurants = async () => {
		setError(error);
		setLoading(true);

		try {
			const response = await axios.get(YELP_SEARCH_PATH, {
				headers: {
					Authorization: `Bearer ${YELP_API_KEY}`,
				},
				params: {
					latitude: latitude,
					longitude: longitude,
					categories: categories.length ? categories.join(',') : '',
				},
			});
			let tempRestaurants = getRestaurants(response);
			let tempRestaurant = getRestaurant(tempRestaurants);
			setLoading(false);
		} catch (error) {
			console.log(error);
			setError(error);
		}
	};

	const openRestaurant = () => {
		Linking.openURL(restaurant.url);
	};

	useEffect(() => {
		fetchRestaurants();
	}, []);

	return (
		<View style={styles.background}>
			<View style={styles.container}>
				<Text style={styles.text}>How about this?</Text>
				<View style={styles.hands}>
					<Emoji name="wave" style={styles.lefthand} />
					<Text style={styles.douzo}> douzo </Text>
					<Emoji name="wave" style={styles.righthand} />
				</View>
				<RestaurantCard restaurant={restaurant} isLoading={isLoading}></RestaurantCard>
				<Button style={styles.button} onPress={openRestaurant}>
					<View style={styles.buttonContainer}>
						<Text style={styles.buttonText}>Open in Yelp </Text>
						<Image source={yelpLogo} style={styles.logo} resizeMode="contain" />
					</View>
				</Button>
				<TryButton title="try again" onPress={() => getRestaurant(restaurants)} />
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
	logo: {
		width: wp(5),
		height: hp(3),
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

export default RestaurantSuggestionScreen;
