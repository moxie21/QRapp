import * as React from 'react';
import 'react-native-gesture-handler';
import { createStackNavigator, CardStyleInterpolators, TransitionPresets } from '@react-navigation/stack';

import GenerateQr from '../screens/GenerateQr';
import ScanQr from '../screens/ScanQr';
import HistoryList from '../screens/HistoryList';
import ViewQrHistory from '../screens/ViewQrHistory';
import CreateQr from '../screens/CreateQr';
import Settings from '../screens/Settings';

const Stack = createStackNavigator();
const ScanScreen = ({ navigation }) => <ScanQr navigation={navigation} />
const GenerateScreen = ({ navigation, route }) => <GenerateQr navigation={navigation} scannedData={route.params}  />
const HistoryScreen = ({ navigation }) => <HistoryList navigation={navigation} />
const ViewQrHistoryScreen = ({ navigation, route }) => <ViewQrHistory navigation={navigation} data={route.params.data} />
const CreateScreen = ({ navigation }) => <CreateQr navigation={navigation}  />
const SettingsScreen = ({ navigation }) => <Settings navigation={navigation}/>;

export default function AppStack() {
  
  return (
			<Stack.Navigator >
				<Stack.Screen name="ScanScreen" component={ScanScreen} options={{headerShown: false}}/>
				<Stack.Screen name="GenerateScreen" options={{headerShown: false,  gestureDirection: 'horizontal-inverted',}}>
					{props => <GenerateScreen {...props} />}
				</Stack.Screen>
				<Stack.Screen name="HistoryScreen" options={{headerShown: false, gestureDirection: 'vertical', cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS}}>
					{props => <HistoryScreen {...props} />}
				</Stack.Screen>
				<Stack.Screen name="ViewQrHistoryScreen" options={{headerShown: false}}>
					{props => <ViewQrHistoryScreen {...props} />}
				</Stack.Screen>
				<Stack.Screen name="CreateScreen" component={CreateScreen} options={{headerShown: false}}/>
				<Stack.Screen name="SettingsScreen" component={SettingsScreen} options={{headerShown: false}}/>
			</Stack.Navigator >
	);
}
