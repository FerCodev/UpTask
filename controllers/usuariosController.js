const Usuarios = require('../models/Usuarios')

exports.formCrearCuenta = (req, res) => {
    res.render('crearCuenta', {
        nombrePagina : 'Crear cuenta en UpTask'
    })
}

exports.formIniciarSesion = (req, res) => {
    const { error } = res.locals.mensajes;
    res.render('iniciarSesion', {
        nombrePagina : 'Iniciar Sesión en UpTask', 
        error
    })
}
/* exports.formIniciarSesion = (req, res) => {
    res.send('hola mundo')
} */

exports.crearCuenta = async (req, res) => {
    // leer los datos
    const {email, password} = req.body

    try {
        //crear el usuario
        await Usuarios.create({
            email,
            password
        })
        res.redirect('/iniciar-sesion')
    } catch (error) {
        req.flash('error', error.errors.map(error => error.message))
        res.render('crearCuenta', {
            mensajes: req.flash(),
            nombrePagina : 'Crear cuenta en UpTask',
            email,
            password
        })
    }
    
    
    
}

exports.formReestablecerPassword = (req, res) => {
    res.render('reestablecer', {
        nombrePagina: 'Reestablecer tu Password'
    })
}