import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import ExploreScreen from "../app/(tabs)/explore";


const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Explore" component={ExploreScreen} options={{ tabBarIcon: ({ color }) => <Ionicons name="compass" size={24} color={color} /> }} />
      {/* <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarIcon: ({ color }) => <Ionicons name="person" size={24} color={color} /> }} /> */}
    </Tab.Navigator>
  );
}
