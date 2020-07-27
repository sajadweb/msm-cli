import express from "express";
import userController from "../controller/user.controller";
import userValidation from "../request/user.validation";
const userRouter = express.Router();
// Get Users
userRouter.get("/", userValidation.getUser, userController.getUser);
// Get User
userRouter.get("/user/:userId", userValidation.getUser, userController.getUser);
// Insert User
userRouter.post("/user", userValidation.insertUser, userController.insertUser);
// Update User
userRouter.put(
  "/user/:userId",
  userValidation.updateUser,
  userController.updateUser
);
// Delete User
userRouter.delete(
  "/user/:userId",
  userValidation.deleteUser,
  userController.destroyUser
);

export default userRouter;
