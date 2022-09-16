import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Game } from '../screens/Game';
import { Home } from '../screens/Home';

export function AppRoutes() {
  const { Navigator, Screen } = createNativeStackNavigator();

  return (
    <Navigator>
      <Screen name="home" component={Home} />
      <Screen name="game" component={Game} />
    </Navigator>
  );
}
