const handleSignin = (db, bcrypt) => (req, res) =>{
    const { email, password} = req.body;
    if(!email || !password) {
        return res.status(400).json('incorrect form submission');
    }
    console.log('oki doki')
    res.status(200).json({
        id: 1,
        email: email,
        name: 'jon',
        entries: 3,
        joined: new Date()
    })
    // db.select('email', 'hash').from('login')
    // .where('email', '=', email)
    // .then(data => {
    //     const isValid = bcrypt.compareSync(password, data[0].hash);
    //     if(isValid){
    //         return db.select('*').from('users')
    //         .where('email', '=', email)
    //         .then(user => {   
    //             res.status(200).json(user[0])
    //         })
    //         .catch(err => res.status(400).json('unable to get user'))
    //     }else{
    //         res.status(400).json('wrong credentials')
    //     }
    // })
    // .catch(err => res.status(400).json('wrong credentials'))
}

module.exports = {
    handleSignin: handleSignin
}