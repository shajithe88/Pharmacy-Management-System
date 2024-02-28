import express from 'express';
import { UserController } from './controllers/UserController';
import { MedicationController } from './controllers/MedicationController';
import { CustomerController } from './controllers/CustomerController';
import { authenticateUser } from './middleware/AuthMiddleware';


const router = express.Router();
// User Authentication
router.post('/login', UserController.authenticateUser);

// Medication Inventory Management
router.get('/medications',authenticateUser, MedicationController.queryMedications);
router.post('/medications', authenticateUser, MedicationController.addMedication);
router.put('/medications/:id', authenticateUser, MedicationController.updateMedication);
router.delete('/medications/:id', authenticateUser, MedicationController.deleteMedication);
router.put('/medications/soft-delete/:id', authenticateUser, MedicationController.softDeleteMedication);

// Customer Record Management
router.get('/customers', authenticateUser,CustomerController.queryCustomers);
router.post('/customers', authenticateUser, CustomerController.addCustomer);
router.put('/customers/:id', authenticateUser, CustomerController.updateCustomer);
router.delete('/customers/:id', authenticateUser, CustomerController.deleteCustomer);
router.put('/customers/soft-delete/:id', authenticateUser, MedicationController.softDeleteMedication);

export default router;

