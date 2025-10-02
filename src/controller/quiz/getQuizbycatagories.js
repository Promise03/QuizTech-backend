import httpstatus from 'http-status';
import Quiz from '../../models/Quiz/quiz';


const getQuiz = async (req, res) => {
    try {

        const type = req.query.type;
        const catagories = req.query.catagories

        let quiz;
        switch(type){
            case "id":
                quiz = await Quiz.findOne({catagories})
                if (!quiz){
                    res.status(httpstatus.NOT_FOUND).json({
                        status: "Not Found",
                        message: `Quiz with catagorie ${catagories} not found`,
                    });
                    break;
                    res.status(httpstatus.OK).json({
                        status: "success",
                        quizData: quiz,
                    })
                }
        }
    } catch (error) {
        res.status(httpstatus.INTERNAL_SERVER_ERROR).json({ message: 'Server error' });
    }
};