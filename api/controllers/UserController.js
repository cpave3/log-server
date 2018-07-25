const _ = require('lodash');

module.exports = {
    /**
     * This method accepts user input specifying the details of a new 
     * account which will be created and returned to the requester
     */
    register: (req, res) => {
        if (req.body.password !== req.body.confirmPassword) {
            return res.status(400).json({ error: true, message: 'Provided passwords do not match' });
        }

        const allowedParameters = [
            'email', 'password'
        ];

        const data = _.pick(req.body, allowedParameters);

        User
        .create(data).fetch()
        .then(async (user) => {
            const responseData = {
                user: await User.transform(user),
                token: await JwtService.issue({ id: user.id }),
            };
            return res
            .status(201)
            .json({
                error: false,
                message: 'User succesfully created',
                data: responseData,
            });
        })
        .catch((error) => {
            if (error) {
                return res
                .status(400)
                .json({
                    error: true,
                    message: 'Something went wrong',
                    data: error
                })
            }
        });
    },

    /**
     * This method accepts the credentials of an existing account 
     * and returns its authentication token
     */
    authenticate: (req, res) => {
        if (!req.body.email || !req.body.password) {
            return res
            .status(400)
            .json({
                error: true,
                message: 'email or password are missing or invalid',
                data: []
            });
        }

        User.findOne({ email: req.body.email })
        .then((user) => {
            if (!user) {
                throw new Error('No user was found matching this email');
            }
            User.comparePassword(req.body.password, user)
            .then(async (match) => {
                if (!match) {
                    throw new Error('The provided username or password are incorrect');
                }
                const responseData = {
                    user: await User.transform(user),
                    token: await JwtService.issue({ id: user.id }),
                };
                return res
                .status(200)
                .json({
                    error: false,
                    message: 'Authentication successful',
                    data: responseData,
                });
            })
            .catch((error) => {
                sails.log.error(error);
            })
        })
        .catch((error) => {
            return res
            .status(400)
            .json({
                error: true,
                message: error.message,
                data: error,
            });
        });
    },

    account: async (req, res) => {
        return res.status(200).json({
            user: await User.transform(req.user)
        });
    },
};