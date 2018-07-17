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

        User.create(data).then((user) => {
            console.log('here');
            const responseData = {
                user,
                token: JwtService.issue({ id: user.id }),
            };
            return res.json(200, {
                error: false,
                message: 'User succesfully created',
                data: responseData,
            });
        })
        .catch((error) => {
            if (error.invalidAttributes){
                return res.json(500, {
                    error: true,
                    message: 'User could not be created',
                    data: error.Errors,
                })
            }
        });
    },
};