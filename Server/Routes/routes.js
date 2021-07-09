const express = require("express");
const router = express.Router();

const controller = require("../controller/controller");
const auth = require("../controller/auth");

router.get('/',controller.login);
router.get('/view-customers', controller.view_customers);
router.get('/view-distributors',controller.view_distributors);
router.get('/view-newspapers',controller.view_newspapers);
router.get('/home',controller.home);
router.get('/delete-customer/:CustomerId',auth.delete_customer);
router.get('/delete-distributor/:UserId',auth.delete_distributor);
router.get('/delete-newspaper/:NewspaperId',auth.delete_newspaper);
router.get('/view-pending',controller.view_pending);
router.get('/view-customer-profile/:CustomerId', controller.view_customer_profile);

router.post('/auth-home',auth.login);
router.post('/add-user',auth.add_users);
router.post('/add-customer',auth.add_customer);
router.post('/add-newspaper',auth.add_newspaper);

module.exports = router;