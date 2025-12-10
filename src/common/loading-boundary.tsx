import { Fragment } from "react";
import { type Loader } from "@/common/loader";

export interface LoadingBoundaryProps {
    loader?: Loader;
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

function Root({ loader, children }: LoadingBoundaryProps) {
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
