import { Stack } from 'expo-router';
import { useSelector } from 'react-redux';

// Prevent the splash screen from auto-hiding before asset loading is complete.

export default function MainStack() {
    const authenticated = useSelector((state) => state.authenticated);
    console.log(`authenticated ${authenticated}`)
    return (
        <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} redirect={!authenticated} />
            <Stack.Screen name="(onboarding)" options={{ headerShown: false }} redirect={authenticated} />
            <Stack.Screen name="+not-found" />
        </Stack>
    );
}
