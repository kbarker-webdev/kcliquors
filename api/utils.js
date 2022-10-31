
//product_orders req 

function requireAdmin(req, res, next){
    if (!req.user){
        next({
            name: 'Unauthorized',
            message: 'You are not authorized for this action.',
        });
    } else {
        if (!req.user.is_admin){
            next({
                name: 'Unauthorized',
                message: 'You are not authorized for this action.',
            });
        }
    }
    next() ;
}
function requireUser(req, res, next){
    if (!req.user){
        next({
            name: 'Unauthorized',
            message: 'You are not authorized for this action.',
        });
    }
    next();
}
module.exports= {requireAdmin, requireUser}