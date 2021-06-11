const Proyectos = require('../models/Proyectos')
const Tareas = require('../models/Tareas')

exports.agregarTarea = async (req, res) => {
    // Obtener el proyecto actua;
    const proyecto = await Proyectos.findOne({
        where: {url: req.params.url}
    })

    //Leer el valor del input
    const {tarea} = req.body;
    // Estado 0 = incompleto i Id de proyecto
    const estado = 0;
    const proyectoId = proyecto.id;

    //Insertar en la base de datos
    const resultado = await Tareas.create({ tarea, estado, proyectoId})

    if(!resultado){
        return next();
    }
    res.redirect(`/proyectos/${req.params.url}`)
}

exports.cambiarEstadoTarea = async (req, res) => {
    const { id } = req.params 
    const tarea = await Tareas.findOne({
        where: {id: id}
    })
    // Cambiar el estado 
    let estado = 0;
    if(tarea.estado === estado){
        estado = 1;
    }
    tarea.estado = estado;

    const resultado = await tarea.save();

    if(!resultado) return next();

    res.status(200).send('Actualizado')
}

exports.eliminarTarea = async (req, res) =>{
    const { id } = req.params;

    //Eliminar tarea 
    const resultado = await Tareas.destroy({
        where: { id : id }
    })
    if(!resultado) return next();

    res.status(200).send('Eliminando...')
}