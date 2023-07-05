import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Authors from "./Authors";
import AuthorProfile from "./AuthorProfile";
import AddAuthor from "./AddAuthor";
import BookProfile from "./BookProfile";

const AuthorStack = createNativeStackNavigator();

function AuthorStackScreen() {
    return (
        <AuthorStack.Navigator screenOptions={{ headerShown: false }}>
            <AuthorStack.Screen name="Home" component={Authors} />
            <AuthorStack.Screen name="AuthorProfile" component={AuthorProfile} />
            <AuthorStack.Screen name="AddAuthor" component={AddAuthor} />
            <AuthorStack.Screen name="BookProfile" component={BookProfile} />
        </AuthorStack.Navigator>
    );
}


export default AuthorStackScreen;