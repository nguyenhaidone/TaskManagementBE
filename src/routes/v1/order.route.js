import express from "express";
import { OrderController } from "*/controllers/order.controller";
import { AuthMiddleware } from "*/middlewares/auth.middleware";

const router = express.Router();

router
  .route("/")
  .post(AuthMiddleware.isAuth, OrderController.createNewOrderController);

router
  .route("/list-order")
  .get(AuthMiddleware.isAuth, OrderController.listOrderController);
// router.route('/:id').put(
//   // AuthMiddleware.isAuth,
//   CardValidations.update,
//   CardController.update
// )

export const orderRoute = router;
