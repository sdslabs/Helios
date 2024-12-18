import useQuizDetailsStore from '../store/QuizDetailsStore'
import { Grid, GridItem, Text, Flex } from '@chakra-ui/react'

const SectionsScroll: React.FC = () => {
  const { sections, rank, marks, totalMarks } = useQuizDetailsStore((state) => {
    return {
      sections: state.sections,
      rank: state.rank,
      marks: state.rank,
      totalMarks: state.totalMarks,
    }
  })

  const totalPercent = Math.round((marks / totalMarks) * 10) / 10

  return (
    <>
      <Grid paddingRight='1vh' paddingBottom='10vh' autoRows='6vh'>
        <GridItem>
          <Flex w='100%' flexDirection='row' padding='2vh'>
            <Text fontWeight='600' fontSize='2vh' w='20%' textAlign='left'>
              Section Name
            </Text>
            <Text fontWeight='600' fontSize='2vh' w='20%' textAlign='center' paddingRight='5vw'>
              Obtained Marks
            </Text>
            <Text fontWeight='600' fontSize='2vh' w='20%' textAlign='center'>
              Maximum Marks
            </Text>
            <Text fontWeight='600' fontSize='2vh' w='20%' textAlign='center' paddingLeft='5vw'>
              Percentage
            </Text>
            <Text fontWeight='600' fontSize='2vh' w='20%' textAlign='right'>
              Rank
            </Text>
          </Flex>
        </GridItem>
        {sections.map((section: any, key: number) => {
          <GridItem>
            <Flex
              w='100%'
              flexDirection='row'
              backgroundColor={key % 2 == 0 ? '#F9F8FB' : '#FEFEFE'}
              padding='2vh'
              borderRadius={6}
            >
              <Text key={key} fontSize='2vh' w='20%' textAlign='left'>
                {section.name}
              </Text>
              <Text key={key} fontSize='2vh' w='20%' textAlign='center' paddingRight='5vw'>
                {section.marksObtained}
              </Text>
              <Text key={key} fontSize='2vh' w='20%' textAlign='center'>
                {section.maximumMarks}
              </Text>
              <Text key={key} fontSize='2vh' w='20%' textAlign='center' paddingLeft='5vw'>
                {section.percentage}
              </Text>
              <Text key={key} fontSize='2vh' w='20%' textAlign='right'>
                {section.rank}
              </Text>
            </Flex>
          </GridItem>
        })}
        <GridItem>
          <Flex
            w='100%'
            flexDirection='row'
            backgroundColor='#EFECF4'
            padding='2vh'
            paddingTop='1.5vh'
            paddingBottom='1.5vh'
            borderRadius={6}
          >
            <Text fontWeight='600' fontSize='2vh' w='20%' textAlign='left'>
              Total
            </Text>
            <Text fontWeight='600' fontSize='2vh' w='20%' textAlign='center' paddingRight='5vw'>
              {marks}
            </Text>
            <Text fontWeight='600' fontSize='2vh' w='20%' textAlign='center'>
              {totalMarks}
            </Text>
            <Text fontWeight='600' fontSize='2vh' w='20%' textAlign='center' paddingLeft='5vw'>
              {totalPercent}%
            </Text>
            <Text fontWeight='600' fontSize='2vh' w='20%' textAlign='right'>
              {rank}
            </Text>
          </Flex>
        </GridItem>
      </Grid>
    </>
  )
}

export default SectionsScroll
