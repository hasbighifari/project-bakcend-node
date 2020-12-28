const jwt = require('jsonwebtoken')

module.exports = async (req, res, next) => {
    try {
        const token = req.header('x-auth-token')
        if (!token) return res.status(401).send({ errorMessage: 'Access denied. No provided token' })
        const decoded = await jwt.verify(token, process.env.jwtPrivateKey)
        if (!decoded) return res.status(401).send({ errorMessage: 'Access denied. No provided token' })
        if (decoded.timeout < new Date().getTime()) return res.status(401).send({ errorMessage: 'your session is finish, please login again' })
        next()
    } catch (error) {
        console.log(error.message)
        if (error.message==='jwt expired'){
            res.status(401).send({ errorMessage: 'your session is finish, please login again' })
        }
        else {
            res.status(401).send({ errorMessage: 'Access denied. No provided token' })
        }

    }
}