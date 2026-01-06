import { useNavigate } from "react-router";

export interface NavigatorController {
    to(path: string): void;
}

export function useNavigator(): NavigatorController {
    const router = useNavigate();

    const to = (path: string) => {
        router(path);
    };

    return { to };
}

export default useNavigator;