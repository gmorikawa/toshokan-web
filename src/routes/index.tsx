import { BrowserRouter, Routes, Route } from "react-router";

import LoginPage from "@/pages/auth/login";

import AppLayout from "@/pages/app/layout";

import DashboardPage from "@/pages/app/dashboard/index.";

import UserListPage from "@/pages/app/user/list";
import CreateUserFormPage from "@/pages/app/user/form/create";
import UpdateUserFormPage from "@/pages/app/user/form/update";

import AuthorListPage from "@/pages/app/author/list";
import CreateAuthorFormPage from "@/pages/app/author/form/create";
import UpdateAuthorFormPage from "@/pages/app/author/form/update";

import LanguageListPage from "@/pages/app/language/list";
import CreateLanguageFormPage from "@/pages/app/language/form/create";
import UpdateLanguageFormPage from "@/pages/app/language/form/update";

import CategoryListPage from "@/pages/app/category/list";
import CreateCategoryFormPage from "@/pages/app/category/form/create";
import UpdateCategoryFormPage from "@/pages/app/category/form/update";

import TopicListPage from "@/pages/app/topic/list/index.";
import CreateTopicFormPage from "@/pages/app/topic/form/create";
import UpdateTopicFormPage from "@/pages/app/topic/form/update";

import PublisherListPage from "@/pages/app/publisher/list";
import CreatePublisherFormPage from "@/pages/app/publisher/form/create";
import UpdatePublisherFormPage from "@/pages/app/publisher/form/update";

import OrganizationListPage from "@/pages/app/organization/list";
import CreateOrganizationFormPage from "@/pages/app/organization/form/create";
import UpdateOrganizationFormPage from "@/pages/app/organization/form/update";

function RouteProvider() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="*" element={<LoginPage />} />
                <Route path="/login" element={<LoginPage />} />

                <Route path="app" element={<AppLayout />}>
                    <Route path="dashboard" element={<DashboardPage />} />

                    <Route path="user">
                        <Route path="list" element={<UserListPage />} />
                        <Route path="form" element={<CreateUserFormPage />} />
                        <Route path="form/:id" element={<UpdateUserFormPage />} />
                    </Route>

                    <Route path="author">
                        <Route path="list" element={<AuthorListPage />} />
                        <Route path="form" element={<CreateAuthorFormPage />} />
                        <Route path="form/:id" element={<UpdateAuthorFormPage />} />
                    </Route>

                    <Route path="language">
                        <Route path="list" element={<LanguageListPage />} />
                        <Route path="form" element={<CreateLanguageFormPage />} />
                        <Route path="form/:id" element={<UpdateLanguageFormPage />} />
                    </Route>

                    <Route path="category">
                        <Route path="list" element={<CategoryListPage />} />
                        <Route path="form" element={<CreateCategoryFormPage />} />
                        <Route path="form/:id" element={<UpdateCategoryFormPage />} />
                    </Route>

                    <Route path="topic">
                        <Route path="list" element={<TopicListPage />} />
                        <Route path="form" element={<CreateTopicFormPage />} />
                        <Route path="form/:id" element={<UpdateTopicFormPage />} />
                    </Route>

                    <Route path="publisher">
                        <Route path="list" element={<PublisherListPage />} />
                        <Route path="form" element={<CreatePublisherFormPage />} />
                        <Route path="form/:id" element={<UpdatePublisherFormPage />} />
                    </Route>

                    <Route path="organization">
                        <Route path="list" element={<OrganizationListPage />} />
                        <Route path="form" element={<CreateOrganizationFormPage />} />
                        <Route path="form/:id" element={<UpdateOrganizationFormPage />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default RouteProvider;