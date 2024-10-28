function onLost(req, res, next) {
    res.status(404).json({
        status: "Failed",
        message: "API not found",
        isSuccess: false,
        data: null,
    });
}

function onError(err, req, res, next) {
    res.status(500).json({
        status: "Failed",
        message: err.message,
        isSuccess: false,
        data: null,
    });
}

module.exports = {
    onLost,
    onError
};
