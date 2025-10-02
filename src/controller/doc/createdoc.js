import Document from '../../models/document/document.js';
import httpStatus from 'http-status';
import { documentSchema } from '../../validation/documentvalidator.js';

// Create new document
export const createDocument = async (req, res) => {
  try {

    const {error} = documentSchema.validate(req.body)
    if(error){
        return res.status(httpStatus.BAD_REQUEST).json({
            status: "Validation Error",
            message: error.details[0].message
        })
    }
    const { title, summary, categories, questions } = req.body;

    const exists = await Document.findOne({ title });
    if (exists) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ message: 'Document with this title already exists' });
    }

    const document = await Document.create({
      title,
      summary,
      categories,
      questions,
    });

    res.status(httpStatus.CREATED).json(document);
  } catch (error) {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: 'Server error', error: error.message });
  }
};








