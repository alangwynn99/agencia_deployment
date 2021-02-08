import { Viaje } from '../models/Viajes.js'
import { Testimonial } from '../models/Testimonial.js'

const paginaInicio = async (req,resp) => {

    const promiseDB = [];

    promiseDB.push(Viaje.findAll({limit:3}));
    promiseDB.push(Testimonial.findAll({limit:3}));

    try {
        const resultado = await Promise.all(promiseDB);
        resp.render('inicio', {
            pagina: 'Inicio',
            clase: 'home',
            viajes: resultado[0],
            testimoniales: resultado[1]
        });   
    } catch (error) {
        console.log(error);
    }
}

const paginaNosotros = (req,resp) => {
    resp.render('nosotros', {
        pagina: 'Nosotros'
    });
}

const paginaViajes = async (req,resp) => {

    const viajes = await Viaje.findAll(); 

    console.log(viajes);

    resp.render('viajes', {
        pagina: 'Proximos viajes',
        viajes
    });
}

const paginaTestimoniales = async (req,resp) => { 
    try {

        const testimoniales = await Testimonial.findAll()

        resp.render('testimoniales', {
            pagina: 'Testimoniales',
            testimoniales
        });
    } catch (error) {
        console.log(error)
    }
}

const paginaDetalleViaje = async (req, resp) => {
    const {slug} = req.params

    try {
        const viaje = await Viaje.findOne({where: {slug}})
        resp.render('viaje', {
            pagina: 'Informacion Viaje',
            viaje
        })
    } catch (error) {
        console.log(error);
    }

}

export {
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaTestimoniales,
    paginaDetalleViaje
}