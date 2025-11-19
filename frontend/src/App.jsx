import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Loader from "./components/Loading";
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Stats = lazy(() => import("./pages/Stats"));

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        <Suspense fallback={<Loader />}>
                            <Dashboard />
                        </Suspense>
                    }
                />
                <Route
                    path="/code/:code"
                    element={
                        <Suspense fallback={<Loader />}>
                            <Stats />
                        </Suspense>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
