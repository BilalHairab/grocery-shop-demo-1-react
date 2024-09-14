import { Stack } from "expo-router"

export default function OnBoardingLayout() {
    return (
        <Stack>
            <Stack.Screen name="order-summary" options={{ headerShown: false }}/>
            <Stack.Screen name="tracking" options={{ headerShown: false }}/>
        </Stack>
    )
}