module.exports = (req, res, next) => {
    let token;

    // Check if Auth header is present
    if (req.headers && req.headers.authorization) {
        // Header is present
        const parts = req.headers.authorization.split(' ');
        if (parts.length == 2) {
            const scheme = parts[0];
            const credentials = parts[1];

            if(/^Bearer$/i.test(scheme)) {
                token = credentials;
            }
        } else {
            return res.status(401).json({
                err: 'Format is Authorization: Bearer [token]'
            });
        }
    } else {
        // Authorization header is not present
        return res.status(401).json({
            err: 'No Authorization token provided'
        });
    }
    
    JwtService.verify(token, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                err: 'Invalid token provided'
            });
        }

        User.findOne({ id: decoded.id })
        .then(user => {
            req.user = user;
            next();
        })
        .catch(error => {
            sails.log.error(error)
            return res.status(500);
        });
    });
    
}
