import { SignedIn, SignedOut, SignIn, UserButton } from "@clerk/clerk-react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const Dashboard = () => (
  <div className="p-8">
    <header className="flex justify-between items-center mb-12">
      <h1 className="text-3xl font-bold text-white tracking-tight">Vaultora</h1>
      <UserButton />
    </header>
    <div className="text-gray-400">Your premium dashboard is loading...</div>
  </div>
);

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