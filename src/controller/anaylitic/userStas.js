import httpStatus from "http-status";
import User from "../../models/user/user.js";

const getUserStas = async (req, res) => {
  try {
    const TotalUsers = await User.countDocuments();

    const stas = await User.aggregate([
      {
        $addFields: {
          userdate: { $dateTrunc: { date: "$createdAt", unit: "day" } }
        },
      },
      {
        $group: {
          _id: "$userdate",
          userAdded: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    res.status(httpStatus.OK).json({
      status: "successful",
      message: "User stats retrieved successfully",
      data: {
        totalUsers: TotalUsers,
        userAddedPerDay: stas,
      },
    });
  } catch (error) {
    console.error("Error in getUserStas:", error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: "Error",
      message: error.message,
    });
  }
};

export default getUserStas;
