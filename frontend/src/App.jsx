import { SignedIn, SignedOut, SignIn } from "@clerk/clerk-react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";


function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-950 flex flex-col">
        <SignedOut>
          <div className="flex-1 flex items-center justify-center">
            <SignIn routing="hash" />
          </div>
        </SignedOut>

        <SignedIn>
          <Routes>
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </SignedIn>
      </div>
    </Router>
  );
}

export default App;