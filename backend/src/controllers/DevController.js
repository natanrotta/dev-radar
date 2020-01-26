const axios = require('axios');
const Dev = require('../models/Dev')
const parseStringAsArray = require('../utils/parseStringAsArray');
const { findConnections, sendMessage } = require('../websocket');

module.exports = {
    async index(request, response) {
        const devs = await Dev.find();

        return response.json(devs);
    },

    async store(request, response) {
        const { github_username, techs, latitude, longitude } = request.body;

        //Verifica se possui um user com esse email/user do git;
        let dev = await Dev.findOne({ github_username })

        if (!dev) {
            //Chamo a api do git para pegar o user;
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);

            //Se ele não existir, ele assume como padrão o valor: login
            const { name = login, avatar_url, bio } = apiResponse.data;

            //Separa o array recebido por , e remove os espaços em branco;
            const techsArray = parseStringAsArray(techs);

            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            }

            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location
            })

            // Filtra as conexões que estão no máximo há 10km de distância e que tenha pelo menos 1 das techs.
            const sendSocketMessageTo = findConnections(
                { latitude, longitude },
                techsArray
            )
            sendMessage(sendSocketMessageTo, 'new-dev', dev);
        }

        return response.json(dev);
    }
}