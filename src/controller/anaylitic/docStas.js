import httpStatus from "http-status";
import Document from "../../models/document/document.js";

const getDocstas = async (req, res) => {
  try {
    const TotalDocs = await Document.countDocuments();

    const stas = await Document.aggregate([
      {
        $addFields: {
          docdate: { $dateTrunc: { date: "$createdAt", unit: "day" } },
        },
      },
      {
        $group: {
          _id: "$docdate",
          docAdded: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.status(httpStatus.OK).json({
      status: "successful",
      message: "Document stats retrieved successfully",
      data: {
        totalDocs: TotalDocs,
        docAddedPerDay: stas,
      },
    });
  } catch (error) {
    console.error("Error in getDocstas:", error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: "Error",
      message: error.message,
    });
  }
};

export default getDocstas;
