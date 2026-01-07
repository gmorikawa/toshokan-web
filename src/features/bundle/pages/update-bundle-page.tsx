import { useParams } from "@shared/router/hooks/params";
import { useNavigator } from "@shared/router/hooks/navigator";

import type { Bundle } from "@features/bundle/types/bundle";
import { bundleValidator } from "@features/bundle/utils/validators";

import { useEffect } from "react";
import useAlert from "@components/feedback/use-alert";
import useForm from "@components/form/use-form";
import useService from "@/services/use-service";
import BundleService from "@/services/bundle-service";

import ApplicationPage from "@/layout/page";
import ApplicationHeader from "@/layout/header";
import ApplicationContent from "@/layout/content";
import ActionButton from "@components/button/action-button";
import BoxContainer from "@components/container/box-container";
import BundleForm from "@features/bundle/components/bundle-form";

import { BackIcon } from "@/common/icons";
import useAuthorizationFilter from "@features/auth/hooks/use-authorization-filter";

type ParamsWithId = {
    id?: string;
}

export function UpdateBundlePage() {
    const authorization = useAuthorizationFilter("ADMIN", "LIBRARIAN");

    function handleSubmit() {
        form.submit();
    }
    const alert = useAlert();
    const navigate = useNavigator();
    const { id } = useParams<ParamsWithId>();

    const service = useService<BundleService>(BundleService, { includeAuthorization: true });

    const form = useForm<Bundle>({
        default: {
            id: "",
            title: "",
            description: ""
        },
        validator: bundleValidator,
        onSubmit: async (entity: Bundle) => {
            if (!form.isValid()) return;
            try {
                await service.update(entity);
                navigate.to("/app/bundle/list");
            } catch (error) {
                alert.showErrorMessage(error as Error);
            }
        }
    });

    async function loadEntity(): Promise<void> {
        if (id) {
            return service.getById(id)
                .then((entity: Bundle) => {
                    form.reset(entity);
                })
                .catch((error: Error) => {
                    alert.showErrorMessage(error);
                });
        }
    };

    function handleBack(): void {
        navigate.to("/app/bundle/list");
    }

    useEffect(() => {
        loadEntity();
    }, []);

    return (
        <ApplicationPage>
            <ApplicationHeader
                title="Bundle"
                actionSlot={
                    <BoxContainer>
                        <ActionButton variant="text" onClick={handleBack} leftIcon={<BackIcon />}>Back</ActionButton>
                    </BoxContainer>
                }
            />

            <ApplicationContent authorization={authorization}>
                <BundleForm form={form} onSubmit={handleSubmit} />
            </ApplicationContent>
        </ApplicationPage>
    );
}

export default UpdateBundlePage;
