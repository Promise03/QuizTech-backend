import httpStatus from 'http-status';
import User from '../../models/user/user.js';

const getUserStas = async (req, res) => {
    try {
        const TotalUser = await User.countDocuments({})
        const stas = await User.aggregate([
            // add a field for the date without time
            {
                $addFields: {
                    userdate: { date: "${createdAt}", unit: "day"}
                }

            },
            // group the new date field and count user by date
            {
                $group: {
                    _id: "${userdate",
                    userAdded: {$sun: 1} 
                }
            },

            // sort the result by date
            {
                $sort: {
                    _id: 1
                }
            },

            res.status(httpStatus.OK).json({
                status: "successful",
                message: "user stas retrieve successfully",
                data:{
                    TotalUsers: TotalUser,
                    userAddedperday: stas,
                }
            })
        ])
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            status: "Error",
            message: error.message
        })
    }
}

export default getUserStas