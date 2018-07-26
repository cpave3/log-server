module.exports = {
    respond: (data = {}, message = '', error = false) => {
        return {
            error,
            message,
            data
        };
    },
};