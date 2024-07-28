import { Stack } from 'expo-router';
import { useSelector } from 'react-redux';

export default function MainStack() {
    const authenticated = useSelector((state) => state.authenticated);
    return (
        <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} redirect={!authenticated} />
            <Stack.Screen name="(onboarding)" options={{ headerShown: false }} redirect={authenticated} />
            <Stack.Screen name="+not-found" />
        </Stack>
    );
}
