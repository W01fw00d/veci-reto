import HomePage from './pages/HomePage';
import { ItemsProvider } from './contexts/ItemsContext';

function App() {
  return (
    <ItemsProvider>
      <HomePage />
    </ItemsProvider>
  );
}

export default App;
