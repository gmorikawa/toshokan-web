import { useNavigator } from '@shared/router/hooks/navigator';

import type { NewBundle } from "@/features/bundle/types/bundle";
import { newBundleValidator } from "@/features/bundle/validators/new-bundle.validator";

import useAlert from "@/components/feedback/use-alert";
import useService from "@/services/use-service";
import useForm from "@/components/form/use-form";
import BundleService from "@/services/bundle-service";

import ApplicationPage from "@/layout/page";
import ApplicationHeader from "@/layout/header";
import ApplicationContent from "@/layout/content";
import BoxContainer from "@/components/container/box-container";
import ActionButton from "@/components/button/action-button";

import BundleForm from "@/features/bundle/components/bundle-form";

import { BackIcon } from "@/common/icons";
import useAuthorizationFilter from "@/features/auth/hooks/use-authorization-filter";

export function CreateBundlePage() {
    const authorization = useAuthorizationFilter("ADMIN", "LIBRARIAN");

    function handleSubmit() {
        form.submit();
    }
    const alert = useAlert();
    const navigate = useNavigator();

    const service = useService<BundleService>(BundleService, { includeAuthorization: true });

    const form = useForm<NewBundle>({
        default: {
            title: "",
            description: ""
        },
        validator: newBundleValidator,
        onSubmit: async (entity: NewBundle) => {
            if (!form.isValid()) return;
            try {
                await service.create(entity);
                navigate.to("/app/bundle/list");
            } catch (error) {
                alert.showErrorMessage(error as Error);
            }
        }
    });

    function handleBack(): void {
        navigate.to("/app/bundle/list");
    }

    return (
        <ApplicationPage>
            <ApplicationHeader
                title="Bundle"
                actionSlot={
                    <BoxContainer>
                        <ActionButton
                            variant="text"
                            onClick={handleBack}
                            leftIcon={<BackIcon />}
                        >
                            Back
                        </ActionButton>
                    </BoxContainer>
                }
            />

            <ApplicationContent authorization={authorization}>
                <BundleForm form={form} onSubmit={handleSubmit} />
            </ApplicationContent>
        </ApplicationPage>
    );
}

export default CreateBundlePage;
