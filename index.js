/**
 * @format
 */

import {AppRegistry} from 'react-native';
/* import Auth from './src/screens/Auth'; */
import Navigator from './src/screens/Navigator';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => Navigator);
