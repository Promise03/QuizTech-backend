import httpStatus from 'http-status';
import Quiz from '../../models/Quiz/quiz.js';



const getQuizstas = async (req, res) => {
    try {
        const TotalQuiz = await Quiz.countDocuments({})

        const stas = await Quiz.aggregate([
            // add field for date without time
            {
                $addFields: {
                    quizdate :{ $datetrunc: { date:"${createdAt}", unit: "day"}}
                }
            },
            // group the new date field and count Quiz by date
            {
                $group: {
                    _id: "${quizdate}",
                    quizAdded : {$sum: 1}

                }
            },
            // sort the quiz by date
            {
                $sort: {
                    _id: 1
                }
            },

            res.status(httpStatus.OK).json({
                status: "successful",
                message: "qiuz stas retrieve successfully",
                data: {
                    totalQuiz: TotalQuiz,
                    quizAddperday: stas
                }
            })
        ])
    } catch (error) {
        
    }
}

export default getQuizstas