import './App.css';
import RoutePage from './Routes/RoutesPage';
import { StyledEngineProvider } from '@mui/material';

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <RoutePage />
    </StyledEngineProvider>
  );
}

export default App;
