import Document from '../../models/document/document.js';
import httpStatus from 'http-status';

// Get all documents
export const getDocuments = async (req, res) => {
  try {
    const documents = await Document.find();
    res.status(httpStatus.OK).json(documents);
  } catch (error) {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: 'Server error', error: error.message });
  }
};