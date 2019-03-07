const handleProfile = (db) => (req, res) => {
    const { id } = req.params;
    db.select('*').from('users').where({id})
    .then(user => {
        res.status(200).json(user[0])
    })
    .catch(err => res.status(400).json('error getting user'));
}

module.exports = {
    handleProfile: handleProfile
}