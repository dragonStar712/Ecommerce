const express = require("express");
const { registerUser, loginUser, logout, forgotPasword, resetPassword, getUserDetails, updatePassword, updateProfile, getAllUser, getSingleUser, updateUserRole, deletUser } = require("../controllers/userController");
const router =  express.Router();
const { isAuthenticatedUser,authorizeRoles } = require("../middleware/authentication");

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/password/forgot").post(forgotPasword);

router.route("/password/reset/:token").put(resetPassword);

router.route("/logout").get(logout);

router.route("/me")
      .get(isAuthenticatedUser ,getUserDetails);

router.route("/me/update")
      .put(isAuthenticatedUser ,updateProfile);

router.route("/password/update")
      .put(isAuthenticatedUser ,updatePassword);

router.route("/admin/users")
      .get(isAuthenticatedUser ,authorizeRoles("admin"), getAllUser);

router.route("/admin/user/:id")
      .get(isAuthenticatedUser ,authorizeRoles("admin"), getSingleUser)
      .put(isAuthenticatedUser ,authorizeRoles("admin"), updateUserRole)
      .delete(isAuthenticatedUser ,authorizeRoles("admin"), deletUser);

module.exports = router;