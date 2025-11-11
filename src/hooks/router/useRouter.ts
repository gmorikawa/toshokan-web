import { useNavigate } from "react-router";

interface UseRouter {
    navigateTo(path: string): void;
}

function useRouter(): UseRouter {
    const router = useNavigate();

    const navigateTo = (path: string) => {
        router(path);
    };

    return { navigateTo };
}

export { useRouter };
export type { UseRouter };
export default useRouter;