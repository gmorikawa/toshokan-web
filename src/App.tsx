import { Provider } from './components/ui/provider';
import RouteProvider from './routes';

function App() {

  return (
    <Provider>
      <RouteProvider />
    </Provider>
  )
}

export default App
