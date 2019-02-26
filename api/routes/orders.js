const express = require('express');
const router = express.Router();
const checkAuth = require ('../middleware/check-auth');
const OrdersController = require( '../controller/orders');


/*Get All orders*/
router.get('/', checkAuth, OrdersController.orders_get_all);

/*Post Order*/
router.post('/', checkAuth, OrdersController.orders_create_orders);

/*Get order By Id*/
router.get('/:orderId', checkAuth, OrdersController.orders_get_order);

/*Delete order By Id*/
router.delete('/:orderId', checkAuth, OrdersController.orders_delete_order);

module.exports = router;