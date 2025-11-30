import type { ListLoader } from "@/hooks/list/use-list-loader";
import { Fragment } from "react";

export interface LoadingBoundaryProps<Entity> {
    loader?: ListLoader<Entity>;
    children: React.ReactElement[];
}

function SuccessState({ children }: React.PropsWithChildren) {
    return children;
}

function LoadingState({ children }: React.PropsWithChildren) {
    return children;
}

function ErrorState({ children }: React.PropsWithChildren) {
    return children;
}

function Root<Entity>({ loader, children }: LoadingBoundaryProps<Entity>) {
    const loadingComponent = children.find((child) => child.type === LoadingState);
    const errorComponent = children.find((child) => child.type === ErrorState);
    const successComponent = children.find((child) => child.type === SuccessState);

    const renderComponentByState = () => {
        switch (loader?.state) {
            case "idle": return loadingComponent || <Fragment />;
            case "loading": return loadingComponent || <Fragment />;
            case "error": return errorComponent || <Fragment />;
            case "success": return successComponent || <Fragment />;
            default: return successComponent || <Fragment />;
        }
    };

    return renderComponentByState();
}

export const LoadingBoundary = { Root, SuccessState, LoadingState, ErrorState };

export default LoadingBoundary;
