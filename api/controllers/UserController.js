const _ = require('lodash');

module.exports = {
    create: (req, res) => {
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
                user: await User.customToJSON(user),
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
};