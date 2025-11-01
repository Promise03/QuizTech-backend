import express from 'express';
import { createDocument } from '../controller/doc/createdoc.js';
import { getDocuments } from '../controller/doc/getAlldoc.js';
import { getDocumentById } from '../controller/doc/getdocbyId.js';
import { updateDocument } from '../controller/doc/editdoc.js';
import { deleteDocument } from '../controller/doc/deletedoc.js';
import { generateQuizFromDoc } from '../controller/quiz/generate.js';

const router = express.Router()

router.post("/createdoc", createDocument)
router.get('/alldoc', getDocuments);            // Read all
router.get('/getsingledoc/:id', getDocumentById);      // Read one
router.patch('/updatedoc/:id', updateDocument);       // Update
router.delete('/deletedoc/:id', deleteDocument);    // Delete

router.post("/:id/generatequiz", generateQuizFromDoc);  // ✅ NEW route

export default router;
