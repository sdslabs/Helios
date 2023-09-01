import { Flex, Heading, Text } from "@chakra-ui/react";
import { TimeIcon } from "@chakra-ui/icons";

export const LabelModal = (headingText: string, subheadingText: string, color: string, colorAccent: string) => {
    return (
        <Flex
            flexDirection='column'
            alignItems='center'
            justifyContent='center'
            w={'full'}
        >
            <TimeIcon color={color} />
            <Text fontSize='2rem' fontWeight='700' mb={4} alignSelf='start' color={color}>
                {headingText}
            </Text>
            <Text fontSize='1rem' fontWeight='400' mb={4} w='58.5rem' color='GrayText'>
                {subheadingText}
            </Text>
        </Flex>
    );
};

