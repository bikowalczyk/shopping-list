import React, { useContext } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import ActiveListsScreen from "../screens/ActiveListsScreen";
import ArchivedListsScreen from "../screens/ArchivedListsScreen";
import ListDetailsScreen from "../screens/ListDetailsScreen";
import Header from "../components/Header";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const ActiveListsStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={ActiveListsScreen}
        name="Active Lists"
        options={({ route, navigation }) => ({
          header: () => (
            <Header
              title="Active Lists"
              navigation={navigation}
              route={route}
            />
          ),
        })}
      />
      <Stack.Screen
        component={ListDetailsScreen}
        name="listDetails"
        options={({ route, navigation }) => ({
          header: () => <Header navigation={navigation} route={route} back />,
        })}
      />
    </Stack.Navigator>
  );
};

const ArchivedListsStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={ArchivedListsScreen}
        name="Archived Lists"
        options={{
          header: ({ navigation }) => (
            <Header title="Archived Lists" navigation={navigation} />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen
          name="Active lists"
          component={ActiveListsStackNavigator}
        />
        <Drawer.Screen
          name="Archived lists"
          component={ArchivedListsStackNavigator}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
