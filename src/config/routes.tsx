import { BrowserRouter, Routes, Route, Navigate } from "react-router";

import { AppLayout } from "@/layout/layout";

import { LoginPage } from "@features/auth/pages/login";

import { FirstAccessPage } from "@features/configuration/pages/first-access";

import { UserListPage } from "@features/user/pages/list";
import { UserCreateFormPage } from "@features/user/pages/create-form";
import { UserUpdateFormPage } from "@features/user/pages/update-form";

import { AuthorListPage } from "@features/author/pages/list";
import { AuthorCreateFormPage } from "@features/author/pages/create-form";
import { AuthorUpdateFormPage } from "@features/author/pages/update-form";

import { LanguageListPage } from "@features/language/pages/list";
import { LanguageCreateFormPage } from "@features/language/pages/create-form";
import { LanguageUpdateFormPage } from "@features/language/pages/update-form";

import { CategoryListPage } from "@features/category/pages/list";
import { CategoryCreateFormPage } from "@features/category/pages/create-form";
import { CategoryUpdateFormPage } from "@features/category/pages/update-form";

import { TopicListPage } from "@features/topic/pages/list";
import { TopicCreateFormPage } from "@features/topic/pages/create-form";
import { TopicUpdateFormPage } from "@features/topic/pages/update-form";

import { PublisherListPage } from "@features/publisher/pages/list";
import { PublisherCreateFormPage } from "@features/publisher/pages/create-form";
import { PublisherUpdateFormPage } from "@features/publisher/pages/update-form";

import { OrganizationListPage } from "@features/organization/pages/list";
import { OrganizationCreateFormPage } from "@features/organization/pages/create-form";
import { OrganizationUpdateFormPage } from "@features/organization/pages/update-form";

import { BookListPage } from "@features/book/pages/list";
import { BookCreateFormPage } from "@features/book/pages/create-form";
import { BookUpdateFormPage } from "@features/book/pages/update-form";
import { BookDetailsPage } from "@features/book/pages/details";
import { BookReadPage } from "@features/book/pages/read";

import { ResearchPaperListPage } from "@features/research-paper/pages/list";
import { ResearchPaperCreateFormPage } from "@features/research-paper/pages/create-form";
import { ResearchPaperUpdateFormPage } from "@features/research-paper/pages/update-form";
import { ResearchPaperDetailsPage } from "@features/research-paper/pages/details";
import { ResearchPaperReadPage } from "@features/research-paper/pages/read";

import { WhitepaperListPage } from "@features/whitepaper/pages/list";
import { WhitepaperCreateFormPage } from "@features/whitepaper/pages/create-form";
import { WhitepaperUpdateFormPage } from "@features/whitepaper/pages/update-form";
import { WhitepaperDetailsPage } from "@features/whitepaper/pages/details";
import { WhitepaperReadPage } from "@features/whitepaper/pages/read";

import { BundleListPage } from "@features/bundle/pages/list";
import { BundleCreateFormPage } from "@features/bundle/pages/create-form";
import { BundleUpdateFormPage } from "@features/bundle/pages/update-form";

export function RouteProvider() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="*" element={<Navigate to="/login" />} />
                <Route path="/login" element={<LoginPage />} />

                <Route path="/first-access" element={<FirstAccessPage />} />

                <Route path="app" element={<AppLayout />}>
                    <Route path="user">
                        <Route path="list" element={<UserListPage />} />
                        <Route path="form" element={<UserCreateFormPage />} />
                        <Route path="form/:id" element={<UserUpdateFormPage />} />
                    </Route>

                    <Route path="book">
                        <Route path="list" element={<BookListPage />} />
                        <Route path="form" element={<BookCreateFormPage />} />
                        <Route path="form/:id" element={<BookUpdateFormPage />} />
                        <Route path="details/:id" element={<BookDetailsPage />} />
                        <Route path="details/:bookId/read/:documentFileId" element={<BookReadPage />} />
                    </Route>

                    <Route path="research-paper">
                        <Route path="list" element={<ResearchPaperListPage />} />
                        <Route path="form" element={<ResearchPaperCreateFormPage />} />
                        <Route path="form/:id" element={<ResearchPaperUpdateFormPage />} />
                        <Route path="details/:id" element={<ResearchPaperDetailsPage />} />
                        <Route path="details/:researchPaperId/read/:documentFileId" element={<ResearchPaperReadPage />} />
                    </Route>

                    <Route path="whitepaper">
                        <Route path="list" element={<WhitepaperListPage />} />
                        <Route path="form" element={<WhitepaperCreateFormPage />} />
                        <Route path="form/:id" element={<WhitepaperUpdateFormPage />} />
                        <Route path="details/:id" element={<WhitepaperDetailsPage />} />
                        <Route path="details/:whitepaperId/read/:documentFileId" element={<WhitepaperReadPage />} />
                    </Route>

                    <Route path="author">
                        <Route path="list" element={<AuthorListPage />} />
                        <Route path="form" element={<AuthorCreateFormPage />} />
                        <Route path="form/:id" element={<AuthorUpdateFormPage />} />
                    </Route>

                    <Route path="language">
                        <Route path="list" element={<LanguageListPage />} />
                        <Route path="form" element={<LanguageCreateFormPage />} />
                        <Route path="form/:id" element={<LanguageUpdateFormPage />} />
                    </Route>

                    <Route path="category">
                        <Route path="list" element={<CategoryListPage />} />
                        <Route path="form" element={<CategoryCreateFormPage />} />
                        <Route path="form/:id" element={<CategoryUpdateFormPage />} />
                    </Route>

                    <Route path="topic">
                        <Route path="list" element={<TopicListPage />} />
                        <Route path="form" element={<TopicCreateFormPage />} />
                        <Route path="form/:id" element={<TopicUpdateFormPage />} />
                    </Route>

                    <Route path="publisher">
                        <Route path="list" element={<PublisherListPage />} />
                        <Route path="form" element={<PublisherCreateFormPage />} />
                        <Route path="form/:id" element={<PublisherUpdateFormPage />} />
                    </Route>

                    <Route path="organization">
                        <Route path="list" element={<OrganizationListPage />} />
                        <Route path="form" element={<OrganizationCreateFormPage />} />
                        <Route path="form/:id" element={<OrganizationUpdateFormPage />} />
                    </Route>

                    <Route path="bundle">
                        <Route path="list" element={<BundleListPage />} />
                        <Route path="form" element={<BundleCreateFormPage />} />
                        <Route path="form/:id" element={<BundleUpdateFormPage />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
