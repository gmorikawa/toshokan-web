import { useNavigator } from "@shared/router/hooks/navigator";
import { ApplicationPage } from "@shared/application/components/application-page";
import { ApplicationHeader } from "@shared/application/components/application-header";
import { ApplicationContent } from "@shared/application/components/application-content";
import { BackIcon } from "@shared/icons";

import { useAlert } from "@components/feedback/alert/controller";
import { useForm } from "@components/form/use-form";
import { BoxContainer } from "@components/container/box-container";
import { ActionButton } from "@components/button/action-button";

import type { NewBundle } from "@features/bundle/types/bundle";
import { useAuthorization } from "@features/auth/hooks/authorization";
import { useBundleService } from "@features/bundle/hooks/bundle-service";
import { newBundleValidator } from "@features/bundle/utils/validators";
import { BundleForm } from "@features/bundle/components/bundle-form";

export function BundleCreateFormPage() {
    const authorization = useAuthorization("ADMIN", "LIBRARIAN");

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

    const handleSubmit = (): void => {
        form.submit();
    };

    const handleBack = (): void => {
        navigate.to("/app/bundle/list");
    };

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
                <BundleForm
                    form={form}
                    onSubmit={handleSubmit}
                />
            </ApplicationContent>
        </ApplicationPage>
    );
}
