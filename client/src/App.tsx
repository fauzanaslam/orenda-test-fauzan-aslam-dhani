import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import AddCustomers from "./pages/AddCustomers";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/add-customer" element={<AddCustomers />} />
      </Routes>
    </Router>
  );
}

export default App;
