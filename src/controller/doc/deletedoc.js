import Document from '../../models/document/document.js';
import httpStatus from 'http-status';

// Delete document
export const deleteDocument = async (req, res) => {
  try {
    const document = await Document.findByIdAndDelete(req.params.id);
    if (!document) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: 'Document not found' });
    }
    res.status(httpStatus.OK).json({ message: 'Document deleted successfully' });
  } catch (error) {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: 'Server error', error: error.message });
  }
};