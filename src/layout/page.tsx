import StackContainer from "@components/container/stack-container";
import ApplicationHeader from "./header";
import ApplicationContent from "./content";

export interface ApplicationPageProps {
    children: React.ReactElement[];
}

export function ApplicationPage({ children }: ApplicationPageProps) {
    const header = children[0];
    const content = children[1];

    if (header.type !== ApplicationHeader) {
        throw new Error("ApplicationPage first child element must me a 'ApplicationHeader'.")
    }

    if (content.type !== ApplicationContent) {
        throw new Error("ApplicationPage second child element must me a 'ApplicationContent'.")
    }

    return (
        <StackContainer fullHeight>
            {children}
        </StackContainer >
    );
}

export default ApplicationPage;
