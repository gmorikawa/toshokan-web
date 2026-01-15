import { ThemeProvider } from "@config/theme";
import { RouteProvider } from "@config/routes";

import { AlertProvider } from "@components/feedback/alert/provider";

import { UserSessionProvider } from "@features/auth/components/user-session-provider";

export function App() {
    return (
        <ThemeProvider>
            <AlertProvider />

            <UserSessionProvider>
                <RouteProvider />
            </UserSessionProvider>
        </ThemeProvider>
    );
}

export default App;
