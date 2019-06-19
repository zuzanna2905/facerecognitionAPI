const handleRegister = ( db, bcrypt) => (req, res) =>{
    const { email, name, password } = req.body;
    if(!email || !name || !password) {
        return res.status(400).json('incorrect form submission');
    }
   // const hash = bcrypt.hashSync(password);
    res.status(200).json({
        id: 1,
        email: email,
        name: name,
        joined: new Date()
    })
    // db.transaction(trx => {
    //     trx.insert({
    //         hash: hash,
    //         email: email
    //     })
    //     .into('login')
    //     .returning('email')
    //     .then(loginEmail => {
    //         return (trx('users')
    //         .returning('*')
    //         .insert({
    //             email: loginEmail[0],
    //             name: name,
    //             joined: new Date()
    //         })
    //         .then(user => {
    //             res.status(200).json(user[0]);
    //         }))
    //     })
    //     .then(trx.commit)
    //     .catch(trx.rollback)
    // })        
    // .catch(err => {
    //     res.status(400).json('unable to register')
    // })
}

module.exports = {
    handleRegister:handleRegister
}