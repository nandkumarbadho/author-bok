import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Books from "./Books";
import BookProfile from "./BookProfile";
import AddBook from "./AddBook";

const BookStack = createNativeStackNavigator();

function BookStackScreen() {
    return (
        <BookStack.Navigator screenOptions={{ headerShown: false }}>
            <BookStack.Screen name="Home" component={Books} />
            <BookStack.Screen name="BookProfile" component={BookProfile} />
            <BookStack.Screen name="AddBook" component={AddBook} />
        </BookStack.Navigator>
    );
}


export default BookStackScreen;