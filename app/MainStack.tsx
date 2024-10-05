import { isAuthenticatedSelector } from '@/reducers/user/userSelectors';
import { Stack } from 'expo-router';
import { SafeAreaView, StatusBar } from 'react-native';
import { useSelector } from 'react-redux';

export default function MainStack() {
    const authenticated = useSelector(isAuthenticatedSelector);
    return (
        <SafeAreaView style={{height: '100%'}}>
            <StatusBar
                backgroundColor={'#000'}
                barStyle={'dark-content'}
            />
        <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false, title: '' }} redirect={!authenticated} />
            <Stack.Screen name="(onboarding)" options={{ headerShown: false }} redirect={authenticated} />
            <Stack.Screen name="(product)" options={{headerShown: false}}/>
            <Stack.Screen name="checkout" options={{headerShown: false}}/>
            <Stack.Screen name="+not-found" />
        </Stack>
        </SafeAreaView>
    );
}
