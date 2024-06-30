import express from "express"
import { authMiddleware } from "../middlewares/basicAuth.middlewares.js";
import { newUserValidate, resendVerificationToken, resetPasswordValidations, loginValidations } from "../middlewares/userValidation.middlewares.js";
import { 
    userSignUp, verifySignupToken, resendVerificationTokenController, forgetPasswordController, resetPasswordController, loginControllers
} from "../controllers/onboarding.controller.js"

const router = express();
router.post('/sign-up', authMiddleware, newUserValidate, userSignUp);
router.get("/verify-signup-token/:token", verifySignupToken);
router.post("/resend-verification-token", authMiddleware, resendVerificationToken, resendVerificationTokenController );
router.post('/forgot-password', authMiddleware, resendVerificationToken, forgetPasswordController);
router.post('/reset-password', authMiddleware, resetPasswordValidations, resetPasswordController);
router.post('/login', authMiddleware, loginValidations, loginControllers);

export default router;