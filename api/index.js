const apiRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;
var session = require('cookie-session');

const { users } = require('../db')

apiRouter.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
  }
));

apiRouter.use(async (req, res, next) => {
  const prefix = 'Bearer ';
  const auth = req.header('Authorization');

  if (!auth) {
    next();
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);

    try {
      const  user  = jwt.verify(token, JWT_SECRET);

      if (user.id) {
        req.user = await users.getUserById(user.id);
        next();
      }
    } catch ({name, message}) {
      next({name, message})
    }
  } else {
    next({
      name: 'AuthorizationHeaderError',
      message: `Authorization token must start with ${ prefix }`
    });
  }
})


apiRouter.get('/', (req, res, next) => {
  res.send({
    message: 'API is under construction!',
  });
});

apiRouter.get('/health', (req, res, next) => {
  res.send({
    healthy: true,
  });
});

const productsRouter = require('./products');
apiRouter.use('/products', productsRouter);

const usersRouter = require('./users');
apiRouter.use('/users', usersRouter)

const por = require('./product_orders')
apiRouter.use('/product_orders', por);

const orderRouter = require('./orders')
apiRouter.use('/orders', orderRouter)

const guestRouter = require('./guest');
apiRouter.use('/guest', guestRouter);

apiRouter.use((error, req, res, next) => {
  res.send({
    name: error.name,
    message: error.message
  })
})

module.exports = apiRouter;
