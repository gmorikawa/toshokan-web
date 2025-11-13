import { BrowserRouter, Routes, Route } from "react-router";

import LoginPage from "@/pages/auth/login";

import AppLayout from "@/pages/app/layout";

import DashboardPage from "@/pages/app/dashboard/index.";

import TopicListPage from "@/pages/app/topic/list/index.";
import CreateTopicFormPage from "@/pages/app/topic/form/create";
import UpdateTopicFormPage from "@/pages/app/topic/form/update";

function RouteProvider() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="*" element={<LoginPage />} />
                <Route path="/login" element={<LoginPage />} />

                <Route path="app" element={<AppLayout />}>
                    <Route path="dashboard" element={<DashboardPage />} />

                    <Route path="topic">
                        <Route path="list" element={<TopicListPage />} />
                        <Route path="form" element={<CreateTopicFormPage />} />
                        <Route path="form/:id" element={<UpdateTopicFormPage />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default RouteProvider;