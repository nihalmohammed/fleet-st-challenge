import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Diff, NotFound } from "./pages";

function App() {
  return (
    <Routes>
      <Route
        path="/repositories/:owner/:repository/commit/:commitSHA"
        element={<Diff />}
      ></Route>
      <Route path="" element={<NotFound />}></Route>
    </Routes>
  );
}

export default App;
