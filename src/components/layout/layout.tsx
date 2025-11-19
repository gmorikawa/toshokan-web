import { Outlet } from "react-router-dom";
import ViewportContainer from "@/components/container/viewport-container";
import FlexContainer from "@/components/container/flex-container";
import BoxContainer from "@/components/container/box-container";

import Menu from "./menu";

export function AppLayout() {
    return (
        <ViewportContainer>
            <FlexContainer fullHeight direction="row">
                <BoxContainer fullHeight flexBasis="auto">
                    <Menu />
                </BoxContainer>
                <BoxContainer fullHeight flexGrow="1">
                    <Outlet />
                </BoxContainer>
            </FlexContainer>
        </ViewportContainer>
    );
}

export default AppLayout;
