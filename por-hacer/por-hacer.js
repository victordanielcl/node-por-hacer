const fs = require('fs');

let listadoPorHacer = {};

const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);
    fs.writeFile(`DB/data.json`, data, (err) => {
        if (err) throw new Error("Error al intentar guardar", err);
    });
}

const cargarDB = () => {
    try {
        listadoPorHacer = require('../DB/data.json');
    } catch (err) {
        listadoPorHacer = [];
    }
}

const crear = (descripcion) => {
    cargarDB();

    let porHacer = {
        descripcion,
        completado: false
    }

    listadoPorHacer.push(porHacer);

    return porHacer;
}

const getListado = () => {
    cargarDB();
    return listadoPorHacer;
}

const actualizar = (descripcion, estado = true) => {
    cargarDB();
    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);
    if (index >= 0) {
        listadoPorHacer[index].completado = estado;
        guardarDB();
        return true;
    } else {
        return false;
    }
}

const eliminar = (descripcion) => {
    cargarDB();
    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);
    if (index >= 0) {
        listadoPorHacer.splice(index, 1);
        guardarDB();
        return true;
    } else {
        return false;
    }
}

module.exports = {
    crear,
    guardarDB,
    cargarDB,
    getListado,
    actualizar,
    eliminar
}