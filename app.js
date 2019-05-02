const colors = require('colors');
const argv = require('./Config/yargs').argv;
const porHacer = require('./por-hacer/por-hacer');

let comando = argv._[0];

switch (comando) {
    case 'crear':
        let res = porHacer.cargarDB();
        let tarea = porHacer.crear(argv.descripcion);
        porHacer.guardarDB();
        console.log(tarea, res);
        break;
    case 'listar':
        let lista = porHacer.getListado();
        let n = 0;
        console.log("Lista de tareas:");
        for (let tarea of lista) {
            n++;
            console.log("=======================".green);
            console.log("Tarea: " + n + ".-" + tarea.descripcion);
            console.log("Estado: " + tarea.completado);
            console.log("=======================".green);
        }

        break;
    case 'actualizar':
        let estado = porHacer.actualizar(argv.descripcion, argv.completado);
        console.log(argv.descripcion);
        if (estado) {
            console.log("Objeto actualizado");
        } else {
            console.log("No se pudo actualizar");
        }
        break;
    case 'eliminar':
        if (porHacer.eliminar(argv.descripcion)) {
            console.log("Objeto eliminado");
        } else {
            console.log("Objeto no eliminado");
        }
        break;
    default:
        console.log("Comando Invalido");
        break;
}