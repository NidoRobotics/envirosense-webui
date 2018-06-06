/**
 * Created by mdps on 06/06/2018.
 */
const fs = require('fs-extra')

var public_dir_dest = '../../web/public/';
var main_view_dest = '../../web/resources/views/dashboard.blade.php';

var folders = [
    ['build/static',public_dir_dest],
];

var files = [
    ['build/asset-manifest.json',public_dir_dest],
    ['build/favicon.ico',public_dir_dest],
    ['build/service-worker.js',public_dir_dest],
    ['build/manifest.json',public_dir_dest],
    ['build/index.html',main_view_dest],
];

console.log('Iniciando deploy del frontend')
console.log('Copiando directorios')
folders.forEach(function(value){
    try {
        fs.moveSync(value[0], value[1], { overwrite: true })
        console.log('Origen: '+value[0]+' Destino: '+value[1]+' OK')
    } catch (err) {
        console.log('Origen: '+value[0]+' Destino: '+value[1]+' FAIL')
        console.error(err)
    }
});

console.log('Copiando ficheros')
files.forEach(function(value){
    try {
        fs.moveSync(value[0], value[1], { overwrite: true })
        console.log('Origen: '+value[0]+' Destino: '+value[1]+' OK')
    } catch (err) {
        console.log('Origen: '+value[0]+' Destino: '+value[1]+' FAIL')
        console.error(err)
    }
});

 console.log("Finalizado deploy del frontend");
