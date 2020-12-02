import React from "react";
import { TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function IconButton({ iconName, color, size, onPress, style }) {
    return (
		<TouchableOpacity
			onPress={onPress}
			style={style}
		>
			<MaterialCommunityIcons
				name={iconName}
				size={size}
				color={color}
			/>
		</TouchableOpacity>
    );
}
