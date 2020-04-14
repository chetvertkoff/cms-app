import jwt from 'jsonwebtoken'

const auth = (req, res, next) =>{
  const token:string = req.headers.authorization
  if(!token) res.status(401).send('Access denied')
  try {
    jwt.verify(token, 'mern')
    next()
  } catch (error) {
    res.status(401).send('Access denied')
  }
}

export default auth