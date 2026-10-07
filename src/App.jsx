import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import Unlimited from "./pages/Unlimited.jsx";
import Backgrounds from "./pages/Backgrounds.jsx";
import Academy from "./pages/Academy.jsx";
import Affiliates from "./pages/Affiliates.jsx";
import Contact from "./pages/Contact.jsx";
import Auth from "./pages/Auth.jsx";
import Mcp from "./pages/Mcp.jsx";
import Legal from "./pages/Legal.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/unlimited" element={<Unlimited />} />
        <Route path="/backgrounds" element={<Backgrounds />} />
        <Route path="/academy" element={<Academy />} />
        <Route path="/affiliates" element={<Affiliates />} />
        <Route path="/public-contact" element={<Contact />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/mcp" element={<Mcp />} />
        <Route path="/terms" element={<Legal kind="terms" />} />
        <Route path="/cookie-policy" element={<Legal kind="cookies" />} />
        <Route path="/refund-policy" element={<Legal kind="refund" />} />
      </Route>
    </Routes>
  );
}
