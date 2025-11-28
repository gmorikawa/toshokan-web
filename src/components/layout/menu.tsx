import useAuthentication from "@/features/auth/hooks/use-authentication";
import useRouter from "@/hooks/router/use-router";

import AppRoute from "@/constants/app";

import BoxContainer from "@/components/container/box-container";
import FlexContainer from "@/components/container/flex-container";
import HeaderTypography from "@/components/typography/header-typography";
import Persona from "@/components/profile/persona";
import StackContainer from "@/components/container/stack-container";
import TextButton from "@/components/button/text-button";

import {
    AuthorIcon,
    BookIcon,
    CategoryIcon,
    LanguageIcon,
    OrganizationIcon,
    PublisherIcon,
    ResearchPaperIcon,
    TopicIcon,
    UserIcon,
    WhitepaperIcon
} from "@/fragments/icons";
import { Logo } from "./logo";
import RestrictedContent from "@/features/auth/components/restricted-content";

interface MenuItemProps {
    icon: React.ReactNode;
    label: string;
    link: string;
}

function MenuItem({ icon, label, link }: MenuItemProps) {
    const router = useRouter();

    function handleClick(): void {
        router.navigateTo(link);
    }

    return (
        <TextButton align="left" leftIcon={icon} onClick={handleClick}>
            {label}
        </TextButton>
    );
}

interface MenuGroupProps extends React.PropsWithChildren {
    title: string;
}

function MenuGroup({ title, children }: MenuGroupProps) {
    return (
        <StackContainer>
            <HeaderTypography>{title}</HeaderTypography>
            {children}
        </StackContainer>
    );
}

interface MenuContainerProps extends React.PropsWithChildren {
    header?: React.ReactNode;
    footer?: React.ReactNode;
}

function MenuContainer({ header, footer, children }: MenuContainerProps) {
    return (
        <BoxContainer
            minWidth="250px"
            colorPalette="green"
            padding={2}
            fullHeight
            borderRightWidth="1px"
            borderRightColor="gray.200"
        >
            <StackContainer spacing={4} fullHeight>
                <BoxContainer flexBasis="auto">
                    {header}
                </BoxContainer>

                <BoxContainer flexGrow={1} overflowY="auto">
                    <StackContainer spacing={4}>
                        {children}
                    </StackContainer>
                </BoxContainer>

                <BoxContainer flexBasis="auto">
                    {footer}
                </BoxContainer>
            </StackContainer>
        </BoxContainer>
    );
}

export function Menu() {
    useAuthentication();

    const { logout, loggedUser } = useAuthentication();

    function handleLogout(): void {
        logout();
    }

    return (
        <MenuContainer
            header={<Logo width={230} />}
            footer={(
                <StackContainer spacing={2}>
                    <Persona name={loggedUser?.fullname ?? ""} email={loggedUser?.email ?? ""} />
                    <FlexContainer justify="flex-end">
                        <TextButton onClick={handleLogout}>
                            Logout
                        </TextButton>
                    </FlexContainer>
                </StackContainer>
            )}
        >
            <MenuGroup title="Documents">
                <MenuItem icon={<BookIcon />} label="Books" link={AppRoute.BOOK_LIST} />
                <MenuItem icon={<WhitepaperIcon />} label="Whitepapers" link={AppRoute.WHITEPAPER_LIST} />
                <MenuItem icon={<ResearchPaperIcon />} label="Research Papers" link={AppRoute.RESEARCH_PAPER_LIST} />
            </MenuGroup>

            <RestrictedContent allowedRoles={["ADMIN", "LIBRARIAN"]}>
                <MenuGroup title="Settings">
                    <MenuItem icon={<AuthorIcon />} label="Authors" link={AppRoute.AUTHOR_LIST} />
                    <MenuItem icon={<LanguageIcon />} label="Languages" link={AppRoute.LANGUAGE_LIST} />
                    <MenuItem icon={<CategoryIcon />} label="Categories" link={AppRoute.CATEGORY_LIST} />
                    <MenuItem icon={<TopicIcon />} label="Topics" link={AppRoute.TOPIC_LIST} />
                    <MenuItem icon={<PublisherIcon />} label="Publishers" link={AppRoute.PUBLISHER_LIST} />
                    <MenuItem icon={<OrganizationIcon />} label="Organizations" link={AppRoute.ORGANIZATION_LIST} />
                </MenuGroup>
            </RestrictedContent>

            <RestrictedContent allowedRoles={["ADMIN"]}>
                <MenuGroup title="System">
                    <MenuItem icon={<UserIcon />} label="Users" link={AppRoute.USER_LIST} />
                </MenuGroup>
            </RestrictedContent>
        </MenuContainer>
    );
};

export default Menu;
