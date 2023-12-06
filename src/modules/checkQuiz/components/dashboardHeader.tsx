import React from 'react';
import { Box, Button, Flex, Text, HStack } from '@chakra-ui/react';

interface DashboardHeaderProps {
  quizName: string;
  quizStartTime: string;
  quizAdmin: string;
  quizTotalParticipants: number;
  quizTotalChecks: number;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  quizName,
  quizStartTime,
  quizAdmin,
  quizTotalParticipants,
  quizTotalChecks,
}) => {
  return (
    <Flex flexDirection="row" gap={10}>
      <Box bgColor="v1" px={10} py={6} borderRadius={4} width="50rem">
        <Flex flexDirection="column">
          <Text fontSize="2rem" fontWeight={600} color="v6">
            {quizName}
          </Text>
          <Text fontSize="1.25rem" color="accentBlack">
            Scheduled on: {quizStartTime}
          </Text>
          <HStack>
            <Text fontSize="1.25rem" color="accentBlack">
              Created by:{' '}
            </Text>
            <Text fontSize="1.25rem" color="v6">
              {quizAdmin}
            </Text>
          </HStack>
          <Button colorScheme="purple" bgColor="brand" px={6} py={3} width="9rem" mt={4}>
            Publish Results
          </Button>
        </Flex>
      </Box>

      {['Total Participating', 'Total Checks'].map((title, index) => (
        <Box key={index} bgColor="v1" borderRadius={4}>
          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            px={6}
            py={9}
          >
            <Text fontSize="3.5rem" fontWeight={600} color="v6">
              {index === 0 ? quizTotalParticipants : quizTotalChecks}
            </Text>
            <Text fontSize="1.25rem" color="v6" textAlign="center">
              {title}
            </Text>
          </Flex>
        </Box>
      ))}
    </Flex>
  );
};

export default DashboardHeader;
