const handleProfile = (db) => (req, res) => {
    const { id } = req.params;
    db.select('*').from('users').where({id})
    .then(user => {
        if(user.length) { 
            res.status(200).json(user[0])
        }else{
            res.status(400).json('not found');
        }
    })
    .catch(err => res.status(400).json('error getting user'));
}

const handleProfileDelete = (db) => (req, res) => {
    const { id } = req.params;
    db.select('*')
    .from('users')
    .where({id})
    .then( (rows) => {
        return db.select('*')
        .from('login')
        .where({email: rows[0].email})
        .del()
        .then(res.status(200).json('success in'))
        .catch(err => res.status(400).json('error deleting user'));
    })
    .catch(err => res.status(400).json('error deleting user'));
}

module.exports = {
    handleProfile: handleProfile,
    handleProfileDelete: handleProfileDelete
}