import { BrowserRouter, Routes, Route } from "react-router";

import FirstAccessPage from "@/features/configuration/pages/first-access-page";

import LoginPage from "@/features/auth/pages/login-page";

import AppLayout from "@/layout/layout";

import ListUserPage from "@/features/user/pages/list-user-page";
import CreateUserFormPage from "@/features/user/pages/create-user-page";
import UpdateUserFormPage from "@/features/user/pages/update-user-page";

import ListAuthorPage from "@/features/author/pages/list-author-page";
import CreateAuthorFormPage from "@/features/author/pages/create-author-page";
import UpdateAuthorFormPage from "@/features/author/pages/update-author-page";

import ListLanguagePage from "@/features/language/pages/list-language-page";
import CreateLanguageFormPage from "@/features/language/pages/create-language-page";
import UpdateLanguageFormPage from "@/features/language/pages/update-language-page";

import ListCategoryPage from "@/features/category/pages/list-category-page";
import CreateCategoryFormPage from "@/features/category/pages/create-category-page";
import UpdateCategoryFormPage from "@/features/category/pages/update-category-page";

import ListTopicPage from "@/features/topic/pages/list-topic-page";
import CreateTopicFormPage from "@/features/topic/pages/create-topic-page";
import UpdateTopicFormPage from "@/features/topic/pages/update-topic-page";

import ListPublisherPage from "@/features/publisher/pages/list-publisher-page";
import CreatePublisherFormPage from "@/features/publisher/pages/create-publisher-page";
import UpdatePublisherFormPage from "@/features/publisher/pages/update-publisher-page";

import ListOrganizationPage from "@/features/organization/pages/list-organization-page";
import CreateOrganizationFormPage from "@/features/organization/pages/create-organization-page";
import UpdateOrganizationFormPage from "@/features/organization/pages/update-organization-page";

import ListBookPage from "@/features/document/book/pages/list-book-page";
import CreateBookFormPage from "@/features/document/book/pages/create-book-page";
import UpdateBookFormPage from "@/features/document/book/pages/update-book-page";
import BookDetailsPage from "@/features/document/book/pages/details-page";

import ListResearchPaperPage from "@/features/document/research-paper/pages/list-research-paper-page";
import CreateResearchPaperFormPage from "@/features/document/research-paper/pages/create-research-paper-page";
import UpdateResearchPaperFormPage from "@/features/document/research-paper/pages/update-research-paper-page";
import ResearchPaperDetailsPage from "@/features/document/research-paper/pages/details-page";

import ListWhitepaperPage from "@/features/document/whitepaper/pages/list-whitepaper-page";
import CreateWhitepaperFormPage from "@/features/document/whitepaper/pages/create-whitepaper-page";
import UpdateWhitepaperFormPage from "@/features/document/whitepaper/pages/update-whitepaper-page";
import WhitepaperDetailsPage from "@/features/document/whitepaper/pages/details-page";

import ListBundlePage from "@/features/bundle/pages/list-bundle-page";
import CreateBundleFormPage from "@/features/bundle/pages/create-bundle-page";
import UpdateBundleFormPage from "@/features/bundle/pages/update-bundle-page";

export function RouteProvider() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="*" element={<LoginPage />} />
                <Route path="/login" element={<LoginPage />} />

                <Route path="/first-access" element={<FirstAccessPage />} />

                <Route path="app" element={<AppLayout />}>
                    <Route path="user">
                        <Route path="list" element={<ListUserPage />} />
                        <Route path="form" element={<CreateUserFormPage />} />
                        <Route path="form/:id" element={<UpdateUserFormPage />} />
                    </Route>

                    <Route path="book">
                        <Route path="list" element={<ListBookPage />} />
                        <Route path="form" element={<CreateBookFormPage />} />
                        <Route path="form/:id" element={<UpdateBookFormPage />} />
                        <Route path="details/:id" element={<BookDetailsPage />} />
                    </Route>

                    <Route path="research-paper">
                        <Route path="list" element={<ListResearchPaperPage />} />
                        <Route path="form" element={<CreateResearchPaperFormPage />} />
                        <Route path="form/:id" element={<UpdateResearchPaperFormPage />} />
                        <Route path="details/:id" element={<ResearchPaperDetailsPage />} />
                    </Route>

                    <Route path="whitepaper">
                        <Route path="list" element={<ListWhitepaperPage />} />
                        <Route path="form" element={<CreateWhitepaperFormPage />} />
                        <Route path="form/:id" element={<UpdateWhitepaperFormPage />} />
                        <Route path="details/:id" element={<WhitepaperDetailsPage />} />
                    </Route>

                    <Route path="author">
                        <Route path="list" element={<ListAuthorPage />} />
                        <Route path="form" element={<CreateAuthorFormPage />} />
                        <Route path="form/:id" element={<UpdateAuthorFormPage />} />
                    </Route>

                    <Route path="language">
                        <Route path="list" element={<ListLanguagePage />} />
                        <Route path="form" element={<CreateLanguageFormPage />} />
                        <Route path="form/:id" element={<UpdateLanguageFormPage />} />
                    </Route>

                    <Route path="category">
                        <Route path="list" element={<ListCategoryPage />} />
                        <Route path="form" element={<CreateCategoryFormPage />} />
                        <Route path="form/:id" element={<UpdateCategoryFormPage />} />
                    </Route>

                    <Route path="topic">
                        <Route path="list" element={<ListTopicPage />} />
                        <Route path="form" element={<CreateTopicFormPage />} />
                        <Route path="form/:id" element={<UpdateTopicFormPage />} />
                    </Route>

                    <Route path="publisher">
                        <Route path="list" element={<ListPublisherPage />} />
                        <Route path="form" element={<CreatePublisherFormPage />} />
                        <Route path="form/:id" element={<UpdatePublisherFormPage />} />
                    </Route>

                    <Route path="organization">
                        <Route path="list" element={<ListOrganizationPage />} />
                        <Route path="form" element={<CreateOrganizationFormPage />} />
                        <Route path="form/:id" element={<UpdateOrganizationFormPage />} />
                    </Route>

                    <Route path="bundle">
                        <Route path="list" element={<ListBundlePage />} />
                        <Route path="form" element={<CreateBundleFormPage />} />
                        <Route path="form/:id" element={<UpdateBundleFormPage />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default RouteProvider;