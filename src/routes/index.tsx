import { BrowserRouter, Routes, Route } from "react-router";

import LoginPage from "@/pages/auth/login";

function RouteProvider() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="*" element={<LoginPage />} />
                <Route path="/login" element={<LoginPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default RouteProvider;