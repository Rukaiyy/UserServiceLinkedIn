import { findUserByUserId, updateProfile} from "../services/onboarding.services.js";
export const getprofileController = async(req, res) => {
    try {
        const userId = req.params.userId;
        const result = await findUserByUserId(userId);
        if(!result){
            return res.status(400).json(
                {
                    "result": "FAILED",
                    "type": "USER_NOT_EXIST", 
                    "message": "Failed to fetch user details."
                }
            );
        }
        return res.status(200).json(
            {
                "result": "SUCCESS",
                "type": "USER_PROFILE",
                "data": result
            }
        )
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const updateProfileController = async(req, res) => {
    try {
        const userDetails = req.userDetails;
        req.body["userId"] = userDetails?._id;
        const result = await updateProfile(req.body);
        if(!result){
            return res.status(400).json(
                {
                    "result": "FAILED",
                    "type": "UPDATE_PROFILE", 
                    "message": "Failed to update user profile details."
                }
            );
        }
        res.status(200).json({
            "result": "SUCCESS",
            "type": "UPDATE_PROFILE",
            "message": "Profile has been updated successfully",
            "data": result
        })
    } catch (error) {
        console.error(error);
        throw error;
    }
}
