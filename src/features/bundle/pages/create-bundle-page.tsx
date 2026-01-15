import { useNavigator } from "@shared/router/hooks/navigator";

import type { NewBundle } from "@features/bundle/types/bundle";
import { newBundleValidator } from "@features/bundle/utils/validators";
import { useAuthorization } from "@features/auth/hooks/authorization";
import { BundleForm } from "@features/bundle/components/bundle-form";

import { useAlert } from "@components/feedback/alert/controller";
import { useForm } from "@components/form/use-form";
import { useBundleService } from "@features/bundle/hooks/bundle-service";

import { ApplicationPage } from "@/layout/page";
import { ApplicationHeader } from "@/layout/header";
import { ApplicationContent } from "@/layout/content";
import { BoxContainer } from "@components/container/box-container";
import { ActionButton } from "@components/button/action-button";

import { BackIcon } from "@shared/icons";

export function CreateBundlePage() {
    const authorization = useAuthorization("ADMIN", "LIBRARIAN");

    function handleSubmit() {
        form.submit();
    }
    const alert = useAlert();
    const navigate = useNavigator();

    const service = useBundleService();

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
