import express from 'express';
import testController from '../controller/test.controller';
import testValidation from '../request/test.validation';
const testRouter = express.Router();

// Get Tests
testRouter.get('/', testValidation.getTest, testController.getTest);

// Get Test
testRouter.get('/test/:testId', testValidation.getTest,testController.getTest);

// Insert Test
testRouter.post('/test', testValidation.insertTest,testController.insertTest);

// Update Test
testRouter.put('/test/:testId', testValidation.updateTest, testController.updateTest);

// Delete Test
testRouter.delete('/test/:testId', testValidation.deleteTest, testController.destroyTest);

export default testRouter;