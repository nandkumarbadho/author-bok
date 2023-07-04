import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Authors from "./Authors";
import AuthorProfile from "./AuthorProfile";

const AuthorStack = createNativeStackNavigator();

function AuthorStackScreen() {
    return (
        <AuthorStack.Navigator screenOptions={{ headerShown: false }}>
            <AuthorStack.Screen name="Home" component={Authors} />
            <AuthorStack.Screen name="AuthorProfile" component={AuthorProfile} />
        </AuthorStack.Navigator>
    );
}


export default AuthorStackScreen;