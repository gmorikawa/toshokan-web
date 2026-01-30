import { useNavigator } from "@shared/router/hooks/navigator";

import { useAuthentication } from "@features/auth/hooks/authentication";

import { AppRoute } from "@/config/constants";

import { BoxContainer } from "@components/container/box-container";
import { FlexContainer } from "@components/container/flex-container";
import { Heading } from "@components/typography/heading";
import { Persona } from "@components/profile/persona";
import { StackContainer } from "@components/container/stack-container";
import { TextButton } from "@components/button/text-button";

import {
    AuthorIcon,
    BookIcon,
    BundleIcon,
    CategoryIcon,
    LanguageIcon,
    OrganizationIcon,
    PublisherIcon,
    ResearchPaperIcon,
    TopicIcon,
    UserIcon,
    WhitepaperIcon
} from "@shared/icons";
import { Logo } from "./logo";
import { RestrictedContent } from "@features/auth/components/restricted-content";
import { useSession } from "@features/auth/hooks/session";
import { Menu, MenuContainer, MenuItem } from "@components/menu/menu";

interface ApplicationMenuItemProps {
    icon: React.ReactNode;
    label: string;
    link: string;
}

function ApplicationMenuItem({ icon, label, link }: ApplicationMenuItemProps) {
    const navigate = useNavigator();

    function handleClick(): void {
        navigate.to(link);
    }

    return (
        <TextButton align="left" leftIcon={icon} onClick={handleClick}>
            {label}
        </TextButton>
    );
}

interface ApplicationMenuGroupProps extends React.PropsWithChildren {
    title: string;
}

function ApplicationMenuGroup({ title, children }: ApplicationMenuGroupProps) {
    return (
        <StackContainer>
            <Heading>{title}</Heading>
            {children}
        </StackContainer>
    );
}

interface ApplicationMenuContainerProps extends React.PropsWithChildren {
    header?: React.ReactNode;
    footer?: React.ReactNode;
}

function ApplicationMenuContainer({ header, footer, children }: ApplicationMenuContainerProps) {
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

export function ApplicationMenu() {
    const { logout } = useAuthentication();
    const { session } = useSession();

    if (!session) {
        throw new Error("No session available");
    }

    function handleLogout(): void {
        logout();
    }

    return (
        <ApplicationMenuContainer
            header={<Logo width={230} />}
            footer={(
                <StackContainer spacing={2}>
                    <Menu
                        menu={
                            <MenuContainer>
                                <MenuItem label="Profile" value="profile" />
                                <MenuItem label="Logout" value="logout" onClick={handleLogout} />
                            </MenuContainer>
                        }
                    >
                        <Persona
                            name={session.loggedUser.fullname ?? ""}
                            email={session.loggedUser.email ?? ""}
                        />
                    </Menu>
                    <FlexContainer justify="flex-end">
                        <TextButton onClick={handleLogout}>
                            Logout
                        </TextButton>
                    </FlexContainer>
                </StackContainer>
            )}
        >
            <ApplicationMenuGroup title="Documents">
                <ApplicationMenuItem icon={<BookIcon />} label="Books" link={AppRoute.BOOK_LIST} />
                <ApplicationMenuItem icon={<WhitepaperIcon />} label="Whitepapers" link={AppRoute.WHITEPAPER_LIST} />
                <ApplicationMenuItem icon={<ResearchPaperIcon />} label="Research Papers" link={AppRoute.RESEARCH_PAPER_LIST} />
            </ApplicationMenuGroup>

            <RestrictedContent allowedRoles={["ADMIN", "LIBRARIAN"]}>
                <ApplicationMenuGroup title="Settings">
                    <ApplicationMenuItem icon={<BundleIcon />} label="Bundles" link={AppRoute.BUNDLE_LIST} />
                    <ApplicationMenuItem icon={<AuthorIcon />} label="Authors" link={AppRoute.AUTHOR_LIST} />
                    <ApplicationMenuItem icon={<LanguageIcon />} label="Languages" link={AppRoute.LANGUAGE_LIST} />
                    <ApplicationMenuItem icon={<CategoryIcon />} label="Categories" link={AppRoute.CATEGORY_LIST} />
                    <ApplicationMenuItem icon={<TopicIcon />} label="Topics" link={AppRoute.TOPIC_LIST} />
                    <ApplicationMenuItem icon={<PublisherIcon />} label="Publishers" link={AppRoute.PUBLISHER_LIST} />
                    <ApplicationMenuItem icon={<OrganizationIcon />} label="Organizations" link={AppRoute.ORGANIZATION_LIST} />
                </ApplicationMenuGroup>
            </RestrictedContent>

            <RestrictedContent allowedRoles={["ADMIN"]}>
                <ApplicationMenuGroup title="System">
                    <ApplicationMenuItem icon={<UserIcon />} label="Users" link={AppRoute.USER_LIST} />
                </ApplicationMenuGroup>
            </RestrictedContent>
        </ApplicationMenuContainer>
    );
};
