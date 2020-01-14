const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
    async index(request, response) {
        //Buscar por um raio específico;
        //Buscar por tais tecnologias;
        const { latitude, longitude, techs } = request.query;

        const techsArray = parseStringAsArray(techs);

        const devs = await Dev.find({
            techs: {
                //As tecnologias que estão dentro do meu array
                $in: techsArray,
            },
            location: {
                $near: {
                    //A posição geométrica
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude],
                    },
                    //Distância máxima de 10km em metros
                    $maxDistance: 10000,
                },
            },
        });

        return response.json({ devs });

    },

    //Não atualizar user do GIT
    async update(request, response){

    },

    async delete(request, response){

    }

}