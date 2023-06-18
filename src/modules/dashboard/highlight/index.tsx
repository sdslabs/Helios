import HighlightWrapper from '../../../common/components/highlight/Wrapper'
import QuizDetails from './details'

interface cardInfo {
    key : any,
    value : any,
}

const cardinfo1 = {
    key: "Attempted Quiz",
    value: "3",
}
const cardinfo2 = {
    key: "Created Quiz",
    value: "10",
}

const highlightContent = () => {
    return (
        <>
            <HighlightWrapper details={<QuizDetails/>} cardinfo1={cardinfo1} cardinfo2={cardinfo2} />
        </>
    )
}
export default highlightContent;