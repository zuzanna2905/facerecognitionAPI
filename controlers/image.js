const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: '64dda3e7800840898a81ed5ce4d178fb'
});

const handleApiCall = (db) => (req,res) => {
    app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
        res.status(200).json(data);
    })
    .catch(err => res.status(400).json('unable to get work'))
}

const handleImage = (db) => (req, res) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.status(200).json(entries[0]);
    })
    .catch(err => res.status(400).json('unable to get entries'));
}

module.exports = {
    handleImage: handleImage,
    handleApiCall: handleApiCall
}