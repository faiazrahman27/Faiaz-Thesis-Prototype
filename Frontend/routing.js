import StartPage from "./screens/startup/page";
import Login from "./screens/login/page";
import Signup from "./screens/signup/page";
import Home from "./screens/home/page";
import AddMoney from "./screens/modules/addmoney";
import SendMoney from "./screens/modules/sendmoney";
import Details from "./screens/modules/details";
import Support from "./screens/modules/support";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import TransactionHistory from "./screens/modules/history";
import Exchange from "./screens/modules/exchange";
import WithDraw from "./screens/modules/withdraw";
import { useAppcontext } from "./screens/appcontext/useappcontext";
const Stack = createNativeStackNavigator();

export default function Routing() {
  const { token } = useAppcontext();

  return (
    <NavigationContainer>
      {token ? (
        <Stack.Navigator initialRouteName="home">
          <Stack.Screen
            name="home"
            component={Home}
            options={{ headerShown: false, unmountOnBlur: true }}
          />
          <Stack.Screen
            name="addMoney"
            component={AddMoney}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="sendMoney"
            component={SendMoney}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="details"
            component={Details}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="history"
            component={TransactionHistory}
            options={{ headerShown: false, unmountOnBlur: true }}
          />
          <Stack.Screen
            name="support"
            component={Support}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="exchange"
            component={Exchange}
            options={{ headerShown: false, unmountOnBlur: true }}
          />
          <Stack.Screen
            name="withDraw"
            component={WithDraw}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator initialRouteName="initialPage">
          <Stack.Screen
            name="initialPage"
            component={StartPage}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="signup"
            component={Signup}
            options={{ headerShown: false, unmountOnBlur: true }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
