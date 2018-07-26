/**
 * TeamControllerController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
    list: (req, res) => {
        // TODO: this
        return res.status(200).json({controller: 'team'});
    },

    /**
     * This method will allow for the creation of a team.
     * Any user may create a team currently, and the creator 
     * will be granted ownership of the team
     */
    create: (req, res) => {
        try {
            // Verify that the required inputs have been provided
            const requiredFields = [
                'name'
            ];
        
            requiredFields.forEach(field => {
                // We need to validate that each field marked as required is present
                // Remove the found item from the requireds array
                if (req.body[field]) {
                    requiredFields.splice(requiredFields.indexOf(field), 1);
                }

                // If we have anything left in the array, it is missing from the request
                if (requiredFields.length > 0) {
                    // This suggests that a field is missing
                    const status = 400;
                    const errorData = {
                        missingField: [...requiredFields]
                    };
                    throw new Error('Request is missing required fields.');
                }

                // If we made it this far, we should have enough data to make a new Team
            });
            
        } catch (error) {
            return res
            .status(status || 500)
            .json({
                error: true,
                message: error.message,
                data: errorData || {}
            });
        }
    },

    read: (req, res) => {},

    update: (req, res) => {},

    delete: (req, res) => {},

};

