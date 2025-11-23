import { Avatar, HStack, Stack, Text } from "@chakra-ui/react";

export interface PersonaProps {
    name: string;
    email: string;
    avatarUrl?: string;
}

export function Persona({ name, email, avatarUrl }: PersonaProps) {
    return (
        <Stack gap="8">
            <HStack key={email} gap="4">
                <Avatar.Root>
                    <Avatar.Fallback name={name} />
                    <Avatar.Image src={avatarUrl} />
                </Avatar.Root>
                <Stack gap="0">
                    <Text fontWeight="medium" textStyle="sm">{name}</Text>
                    <Text color="fg.muted" textStyle="xs">{email}</Text>
                </Stack>
            </HStack>
        </Stack>
    );
}

export default Persona;