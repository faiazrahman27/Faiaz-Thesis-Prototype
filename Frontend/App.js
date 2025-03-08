import { SafeAreaView } from "react-native";
import Routing from "./routing";
import { AppcontextProvider } from "./screens/appcontext/Appcontext";

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AppcontextProvider>
        <Routing />
      </AppcontextProvider>
    </SafeAreaView>
  );
}
