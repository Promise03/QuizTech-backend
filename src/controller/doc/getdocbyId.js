import Document from '../../models/document/document.js';
import httpStatus from 'http-status';

// Get single document by ID
export const getDocumentById = async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);
    if (!document) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: 'Document not found' });
    }
    res.status(httpStatus.OK).json(document);
  } catch (error) {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: 'Server error', error: error.message });
  }
};