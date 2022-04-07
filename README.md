# react-native-reanimated-bounce
## Demo
https://user-images.githubusercontent.com/44049919/162251517-cc38d366-c9ac-4638-9f5a-4fb184e3fabb.mp4
## Prereq
**react-native-reanimated** is needed:
``` bash
yarn add react-native-reanimated react-native-reanimated-bounce
```
change `babel.config.js` to:
``` js
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ['react-native-reanimated/plugin'] // add this line to existing file
  };
};
```
## Usage
``` js
import * as React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native';
import Animated, {
  withTiming
} from 'react-native-reanimated'
import BounceView from 'react-native-reanimated-bounce'

export default function App() {
  const animate = React.useRef(null)
  return (
    <Animated.View style={styles.container}>
      <BounceView animate={animate} component={
        <Animated.View style={{backgroundColor:'black', borderRadius:20, height:100, width:100}}/>
      }/>
      <Button onPress={()=> animate.current()} title='move'></Button>
    </Animated.View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
```
