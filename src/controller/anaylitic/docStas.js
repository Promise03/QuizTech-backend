import httpStatus from 'http-status';
import Document from '../../models/document/document';


const getDocstas = async (req, res) => {
    try {
        const Totaldoc = await Document.countDocuments({})
        const stas = await Document([
            {
                $addfield: {
                        $docdate :{ date: "${createdAt", unit: "day"}
                }
            },
            {
                $group: {
                    _id: "${docdate}",
                    docadded: {$sum: 1}
                }
            },
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

export default getDocstas

