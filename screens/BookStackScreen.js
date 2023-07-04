import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Books from "./Books";
import BookProfile from "./BookProfile";

const BookStack = createNativeStackNavigator();

function BookStackScreen() {
    return (
        <BookStack.Navigator screenOptions={{ headerShown: false }}>
            <BookStack.Screen name="Home" component={Books} />
            <BookStack.Screen name="BookProfile" component={BookProfile} />
        </BookStack.Navigator>
    );
}


export default BookStackScreen;