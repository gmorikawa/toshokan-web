import type { Whitepaper } from "@/entities/models/whitepaper";

import { useEffect } from "react";
import useAlert from "@/hooks/feedback/use-alert";
import useRouter from "@/hooks/router/use-router";
import useParams from "@/hooks/router/use-params";
import useService from "@/services/use-service";
import WhitepaperService from "@/services/whitepaper-service";

import useForm from "@/components/form/use-form";
import ActionButton from "@/components/button/action-button";
import BoxContainer from "@/components/container/box-container";
import ApplicationPage from "@/pages/app/page";
import ApplicationHeader from "@/pages/app/header";
import ApplicationContent from "@/pages/app/content";
import WhitepaperForm from "../form";

import { BackIcon } from "@/fragments/icons";

type ParamsWithId = {
    id?: string;
}

export function UpdateWhitepaperFormPage() {
    const alert = useAlert();
    const router = useRouter();
    const { id } = useParams<ParamsWithId>();

    const service = useService<WhitepaperService>(WhitepaperService, { includeAuthorization: true });

    const form = useForm<Whitepaper>({
        default: {
            id: "",
            title: "",
            summary: "",
            language: null,
            authors: [],
            topics: [],
            organization: null
        }
    });

    async function loadEntity(): Promise<void> {
        if (id) {
            return service.getById(id)
                .then((entity: Whitepaper) => {
                    form.reset(entity);
                })
                .catch((error: Error) => {
                    alert.showErrorMessage(error);
                });
        }
    };

    function handleSave(): void {
        service.update(form.entity)
            .then(() => {
                router.navigateTo("/app/whitepaper/list");
            })
            .catch((error: Error) => {
                alert.showErrorMessage(error);
            });
    }

    function handleBack(): void {
        router.navigateTo("/app/whitepaper/list");
    }

    useEffect(() => {
        loadEntity();
    }, []);

    return (
        <ApplicationPage>
            <ApplicationHeader
                title="Whitepaper"
                actionSlot={
                    <BoxContainer>
                        <ActionButton variant="text" onClick={handleBack} leftIcon={<BackIcon />}>Back</ActionButton>
                    </BoxContainer>
                }
            />

            <ApplicationContent>
                <WhitepaperForm form={form} onSubmit={handleSave} />
            </ApplicationContent>
        </ApplicationPage>
    );
}

export default UpdateWhitepaperFormPage;
