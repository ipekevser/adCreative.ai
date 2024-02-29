import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { MainContainer } from "./containers";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/characters" element={<MainContainer />} />
        <Route path="/" element={<Navigate replace to="/characters" />} />
        <Route path="*" element={<Navigate replace to="/characters" />} />
      </Routes>
    </Router>
  );
};

export default App;
