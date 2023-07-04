import client from './client';
import { ApolloProvider } from '@apollo/client';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AuthorStackScreen from './screens/AuthorStackScreen';
import BookStackScreen from './screens/BookStackScreen';

const Tab = createBottomTabNavigator();
export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Tab.Navigator initialRouteName="Authors" screenOptions={{ headerShown: false }}>
          <Tab.Screen name="Authors" component={AuthorStackScreen} />
          <Tab.Screen name="Books" component={BookStackScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </ApolloProvider >
  );
}


