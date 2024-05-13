const jwt = require("jsonwebtoken");

const isAuthenticated = async (req, res, next)=> {
    try{
        const{token} =req.cookies

        if(!token) {
            res
                .status(401)
                .render("login",{ message:"Unauthorized Plz login again"})
        } else{
            const verifyToken = await jwt.verify(
                token,
                "thisismysecretkey",
                (reject,resolve) => {
                  if (reject) {
                    res.status(403).render("login",{
                        message:"Forbidden: Plz login again after sometime ",
                    })

                  } else{
                    return next()
                  }
                }
            )
            console.log(verifyToken);
        }

    }catch(err){
        console.log(err);
    }
};

module.exports = isAuthenticated;