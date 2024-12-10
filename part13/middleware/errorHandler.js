
const errorHandler = (error, req, res, next) => {
    console.log(error)
    if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({
            errors: error.errors.map((e) => e.message),
        });
    }

    if (error.name === 'SequelizeDatabaseError') {
        return res.status(500).json({ error: 'Database error occurred', data: error });
    }

    if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({ error: 'Invalid token' });
    }

    if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ error: 'Token expired' });
    }

    next(error)
}

const unkownEndpoint = (req, res,) => {
    res.status(404).send({ error: 'unknown endpoint' })
}

module.exports = { unkownEndpoint, errorHandler }
