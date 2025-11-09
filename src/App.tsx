import ThemeProvider from './components/style/theme-provider';
import ToastProvider from './components/feedback/toaster-provider';
import RouteProvider from './routes';

function App() {
    return (
        <ThemeProvider>
            <ToastProvider />
            <RouteProvider />
        </ThemeProvider>
    );
}

export default App
