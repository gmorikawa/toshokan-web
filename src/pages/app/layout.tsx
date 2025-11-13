import { Outlet } from "react-router-dom";
import ViewportContainer from "@/components/container/viewport-container";
import FlexContainer from "@/components/container/flex-container";
import TextButton from "@/components/button/text-button";
import BoxContainer from "@/components/container/box-container";
import StackContainer from "@/components/container/stack-container";
import BorderedContainer from "@/components/container/bordered-container";

export function AppLayout() {
    return (
        <ViewportContainer>
            <FlexContainer fullHeight direction="row">
                <BoxContainer fullHeight flexBasis="auto">
                    <StackContainer>
                        <TextButton align="left">Books</TextButton>
                        <TextButton align="left">Whitepapers</TextButton>
                        <TextButton align="left">Research Papers</TextButton>
                    </StackContainer>
                </BoxContainer>
                <BoxContainer fullHeight flexGrow="1" padding="8px">
                    <BorderedContainer fullHeight>
                        <Outlet />
                    </BorderedContainer>
                </BoxContainer>
            </FlexContainer>
        </ViewportContainer>
    );
}

export default AppLayout;
