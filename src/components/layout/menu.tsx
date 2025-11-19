import AppRoute from "@/constants/app";

import TextButton from "@/components/button/text-button";
import BoxContainer from "@/components/container/box-container";
import StackContainer from "@/components/container/stack-container";
import HeaderTypography from "@/components/typography/header-typography";

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
import useRouter from "@/hooks/router/use-router";

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

interface MenuContainerProps extends React.PropsWithChildren { }

function MenuContainer({ children }: MenuContainerProps) {
    return (
        <BoxContainer
            minWidth="250px"
            colorPalette="green"
            padding={2}
            fullHeight
            borderRightWidth="1px"
            borderRightColor="gray.200"
        >
            <StackContainer spacing={4}>
                {children}
            </StackContainer>
        </BoxContainer>
    );
}

export function Menu() {
    return (
        <MenuContainer>
            <MenuGroup title="System">
                <MenuItem icon={<UserIcon />} label="Users" link={AppRoute.USER_LIST} />
            </MenuGroup>

            <MenuGroup title="Documents">
                <MenuItem icon={<BookIcon />} label="Books" link={AppRoute.BOOK_LIST} />
                <MenuItem icon={<WhitepaperIcon />} label="Whitepapers" link={AppRoute.WHITEPAPER_LIST} />
                <MenuItem icon={<ResearchPaperIcon />} label="Research Papers" link={AppRoute.RESEARCH_PAPER_LIST} />
            </MenuGroup>

            <MenuGroup title="Settings">
                <MenuItem icon={<AuthorIcon />} label="Authors" link={AppRoute.AUTHOR_LIST} />
                <MenuItem icon={<LanguageIcon />} label="Languages" link={AppRoute.LANGUAGE_LIST} />
                <MenuItem icon={<CategoryIcon />} label="Categories" link={AppRoute.CATEGORY_LIST} />
                <MenuItem icon={<TopicIcon />} label="Topics" link={AppRoute.TOPIC_LIST} />
                <MenuItem icon={<PublisherIcon />} label="Publishers" link={AppRoute.PUBLISHER_LIST} />
                <MenuItem icon={<OrganizationIcon />} label="Organizations" link={AppRoute.ORGANIZATION_LIST} />
            </MenuGroup>
        </MenuContainer>
    );
};

export default Menu;
