// const express = require('express');
// const session = require('express-session');
// const app = express();
// // const { cartRouter } = require('./src/')

// app.use(express.json());

// app.use(
//     session({
//         secret: "secrets",
//         resave: false,
//         saveUninitialized: false
//     })
// );
// app.use((req, res, next) => {
//     console.log(`${req.method}:${req.url}`);
//     next();
// });
// // app.use('/api/carts', cartsRouter)
// app.get("/", (req, res) => {
//     console.log(req.session);
//     console.log('the actual session id: ', req.sessionID)
// })
