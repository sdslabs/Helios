import HighlightWrapper from '../../../common/components/highlight/Wrapper'
import QuizDetails from './details'

// mock data as of now
const cardinfo1 = {
    key: "Total Participants",
    value: "1000",
}
const cardinfo2 = {
    key: "Checks Completed",
    value: "999",
}

const highlightContent = () => {
    return (
        <HighlightWrapper details={<QuizDetails/>} cardinfo1={cardinfo1} cardinfo2={cardinfo2} />
    )
}
export default highlightContent;