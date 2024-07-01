export const getprofileController = async(req, res) => {
    try {
        const userId = req.params.userId;
        console.log({userId});
        return userId;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
