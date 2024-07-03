import express from "express"
import { authMiddleware } from "../middlewares/basicAuth.middlewares.js";
import { newUserValidate, resendVerificationToken, resetPasswordValidations, loginValidations, updateProfile } from "../middlewares/userValidation.middlewares.js";
import { 
    userSignUp, verifySignupToken, resendVerificationTokenController, forgetPasswordController, resetPasswordController, loginControllers
} from "../controllers/onboarding.controller.js"
import { getprofileController, updateProfileController } from "../controllers/profile.controller.js";
import { verifyJwtToken } from "../middlewares/userAuth.middleware.js"
import { userProfileApi } from "../middlewares/userValidation.middlewares.js";

const router = express();
router.post('/sign-up', authMiddleware, newUserValidate, userSignUp);
router.get("/verify-signup-token/:token", verifySignupToken);
router.post("/resend-verification-token", authMiddleware, resendVerificationToken, resendVerificationTokenController );
router.post('/forgot-password', authMiddleware, resendVerificationToken, forgetPasswordController);
router.post('/reset-password', authMiddleware, resetPasswordValidations, resetPasswordController);
router.post('/login', authMiddleware, loginValidations, loginControllers);


router.get("/profile/:userId", verifyJwtToken, userProfileApi, getprofileController);
router.put("/profile", verifyJwtToken, updateProfile, updateProfileController);

export default router;