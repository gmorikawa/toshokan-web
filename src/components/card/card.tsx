import { Card as ChakraCard } from "@chakra-ui/react";

export interface CardProps extends React.PropsWithChildren {
    title?: string;
    width?: string | number;
    footer?: React.ReactNode;
}

export function Card({ width, title, footer, children }: CardProps) {
    return (
        <ChakraCard.Root width={width ?? "100%"}>
            {/* <ChakraCard.Header>
            </ChakraCard.Header> */}
            <ChakraCard.Body gap="2">
                {(title) && (
                    <ChakraCard.Title mt="2">
                        {title}
                    </ChakraCard.Title>
                )}

                {children}
            </ChakraCard.Body>
            {(footer) && (
                <ChakraCard.Footer display="block">
                    {footer}
                </ChakraCard.Footer>
            )}
        </ChakraCard.Root>
    );
}

export default Card;