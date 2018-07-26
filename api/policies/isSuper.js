/**
 * This Policy will verify that the requesting user has super-user permissions
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
module.exports = async (req, res, next) => {
    // Lets start by defining the default 'unknown' error code
    let status = 500;
    try {
        // Check for a currently verified user
        if (!req.user) {
            status = 401;
            throw new Error('No authenticated user found');
        }

        // If we have a verified user, we should check if they are super or not
        if (await User.isSuperUser(req.user)) {
            // The user is super, so continue
            next();
        } else {
            status = 401;
            throw new Error('You do not have permission to access this resource');
        }
    } catch (error) {
        // If anything goes wrong, firstly, log it via the sails logging
        sails.log.info({
            message: 'A non super-user attempted to access a super-user protected route',
            data: {
                userId: req.user.id
            }
        });
        
        // then return a JSON response of the issue
        return res
        .status(status)
        .json({
            error: true,
            message: error.message,
            data: {}
        });
    }
};