import { BrowserRouter, Routes, Route } from "react-router";

import LoginPage from "@/pages/auth/login";
import DashboardPage from "@/pages/auth/dashboard/index.";

function RouteProvider() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="*" element={<LoginPage />} />
                <Route path="/login" element={<LoginPage />} />

                <Route path="/dashboard" element={<DashboardPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default RouteProvider;