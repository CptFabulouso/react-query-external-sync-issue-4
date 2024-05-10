import { Button, StyleSheet,  Text,  View } from 'react-native';
import ReactQueryDevtools from './src/ReactQueryDevtools';
import { queryClient } from './src/queryClient';
import { useState } from 'react';
import UseQueryComponent from './src/UseQueryComponent';
import { QueryClientProvider } from '@tanstack/react-query';


export default function App() {
  const [displayComponent, setDisplayComponent] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools
        socketURL={process.env.EXPO_PUBLIC_REACT_DEVTOOLS_SOCKET_URL || ''}
        queryClient={queryClient}
      >
        {() => (
          <View style={{flex: 1, justifyContent: 'center', alignItems:'center'}}>
            <Text>Press button below to mount component with useQuery hook</Text>
            {!displayComponent && <Button onPress={() => setDisplayComponent(true)} title="Mount component" />}
            {displayComponent && <UseQueryComponent />}
          </View>
        )}
      </ReactQueryDevtools>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
