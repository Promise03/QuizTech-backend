import Document from '../../models/document/document.js';
import httpStatus from 'http-status';

// Update document
export const updateDocument = async (req, res) => {
  try {
    const document = await Document.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
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