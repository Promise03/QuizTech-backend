import httpStatus from 'http-status';
import User from '../../models/user/user';


const getUserCountByRole = async (req, res) => {
    try {
        const result = await User.aggregate([
            {$group:{
                _id:"$role", 
                count: {$sum: 1}
            }},
            {
                $sort: {
                    count: -1
                }
            }
        ])
        res.status(httpStatus.OK).json({
            status: "Success",
            data: result
        })
        
    } catch (e) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            status: "Error",
            message: e.massage
        })
    }
}

export default getUserCountByRole