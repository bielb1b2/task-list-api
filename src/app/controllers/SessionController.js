const jwt = require('jsonwebtoken');

const User = require('../models/User');
const authConfig = require('../../config/auth');

class SessionController {
    async store(req, res) {
        const {email, password} = req.body;

        //Verify email = TRUE
        const user = await User.findOne({ where: { email } });
        if(!user){
            return res.status(401).json({ error: "Usuario não encontrado! "})
        }


        //verify password = password_hash
        if(!(await user.checkPassword(password))){
            return res.status(401).json({ error: 'Senha incorreta' });
        }

        const {id, name} = user;


        return res.json({
            user:{
                id,
                name,
                email,
            },
            token: jwt.sign({ id }, authConfig.secret, {
                expiresIn: authConfig.expiresIn, 
            })
        });
    }
}

module.exports = new SessionController();