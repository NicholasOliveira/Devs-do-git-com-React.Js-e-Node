const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {

  async index(request, response) {
    const devs = await Dev.find({
    }).sort({ 'github_username': 1 });

    return response.json(devs);
  },
  async store(request, response) {

    const { github_username, techs, latitude, longitude } = request.body;

    let dev = await Dev.findOne({ github_username });

    if (!dev) {

      const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);

      const { name = login, avatar_url, bio } = apiResponse.data;
      const techsArray = parseStringAsArray(techs);

      const location = {
        type: 'Point',
        coordinates: [longitude, latitude],
      }

      dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location
      })
    }
    return response.json(dev);
  },

  async update(request, response) {
    const { name, bio, github_usernam, Techs } = request.query;
    const techsArray2 = parseStringAsArray(Techs);
    dev = await Dev.updateOne(
      { github_username: github_usernam },
      {
        $set:
        {
          name: name,
          bio: bio,
          techs: techsArray2,
        }
      })

    return response.json(dev);
  },

  async delete(request, response) {
    const { github_username } = request.query;
    dev = await Dev.deleteOne(
      { github_username: github_username }
    )
    const devs = await Dev.find();
    return response.json(devs);
  },
};