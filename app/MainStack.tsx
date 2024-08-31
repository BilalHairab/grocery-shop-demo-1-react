import { isAuthenticatedSelector } from '@/reducers/user/userSelectors';
import { Stack } from 'expo-router';
import { useSelector } from 'react-redux';

export default function MainStack() {
    const authenticated = useSelector(isAuthenticatedSelector);
    return (
        <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false, title: '' }} redirect={!authenticated} />
            <Stack.Screen name="(onboarding)" options={{ headerShown: false }} redirect={authenticated} />
            <Stack.Screen name="(product)" options={{headerShown: false}}/>
            <Stack.Screen name="+not-found" />
        </Stack>
    );
}
