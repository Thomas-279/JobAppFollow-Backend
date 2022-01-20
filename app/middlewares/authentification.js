
const authentification = {
    login : async (req, resp) => {
        // je récupère le contenu de req.body dans un objet user
        const user = { 
            mail : req.body.mail,
            password: req.body.password
        }
         // On verifie que tout les champs sont bien renseignés
        if (user.mail == undefined || user.password == undefined ){
            if(!user.mail){
            return response.status(400).send({'error' : 'missing mail'})
            } else {
            return response.status(400).send({'error' : 'missing password'})
            }
        }
    },

    logout : (req, res) => {
        res.status(200).json({
            firstname : '',
            admin: '',
            token : ''
        }).send('utilisateur déconnecté')
    },
}


module.exports = authentification;