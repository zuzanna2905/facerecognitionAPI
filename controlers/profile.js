const handleProfile = (db) => (req, res) => {
    const { id } = req.params;
    db.select('*').from('users').where({id})
    .then(user => {
        res.status(200).json(user[0])
    })
    .catch(err => res.status(400).json('error getting user'));
}

const handleProfileUpdate = (db) => (req, res) => {
    const { id } = req.params;
    const {name, age, pet} = req.body.formInput;
    db('users').where({id})
    .update({name, pet, age})
    .then(resp => {
        if( resp ) {
            res.json("success")
        } else {
            res.status(400).json('unable to update')
        }
    })
    .catch(err => res.status(400).json('error getting user'));
}

module.exports = {
    handleProfile: handleProfile,
    handleProfileUpdate: handleProfileUpdate
}