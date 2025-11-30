import ThemeProvider from "./config/theme";
import RouteProvider from "./config/routes";
import AlertProvider from "./config/alert";

export function App() {
    return (
        <ThemeProvider>
            <AlertProvider />
            <RouteProvider />
        </ThemeProvider>
    );
}

export default App;
