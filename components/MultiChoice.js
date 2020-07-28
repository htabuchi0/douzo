import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
// import MultiSelect from 'react-native-multiple-select';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import CustomMultiPicker from 'react-native-multiple-select-list';

const MultiChoice = (props) => {
	const onSelectedItemsChange = (selectedItems) => {
		props.setSelectedItems(selectedItems);
	};

	return (
		<View style={{ width: wp(55) }}>
			<CustomMultiPicker
				options={props.items}
				search={props.search} // should show search bar?
				multiple={true} //
				placeholder={['Search for ', props.title].join('')}
				returnValue={'value'} // label or value
				callback={(selectedItems) => {
					onSelectedItemsChange(selectedItems);
				}} // callback, array of selected items
				rowBackgroundColor={'#eee'}
				rowHeight={40}
				rowRadius={7}
				iconColor={'#00a2dd'}
				iconSize={25}
				selectedIconName={'ios-happy'}
				unselectedIconName={'ios-radio-button-off'}
				scrollViewHeight={hp(20)}
				fontSize={25}
				selected={[]} // list of options which are selected by default
			/>
		</View>
	);
};

const styles = StyleSheet.create({});

export default MultiChoice;
