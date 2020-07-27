import express from 'express';
import adminController from '../controller/admin.controller';
import adminValidation from '../request/admin.validation';
const adminRouter = express.Router();

// Get Admins
adminRouter.get('/', adminValidation.getAdmin, adminController.getAdmin);

// Get Admin
adminRouter.get('/admin/:adminId', adminValidation.getAdmin,adminController.getAdmin);

// Insert Admin
adminRouter.post('/admin', adminValidation.insertAdmin,adminController.insertAdmin);

// Update Admin
adminRouter.put('/admin/:adminId', adminValidation.updateAdmin, adminController.updateAdmin);

// Delete Admin
adminRouter.delete('/admin/:adminId', adminValidation.deleteAdmin, adminController.destroyAdmin);

export default adminRouter;