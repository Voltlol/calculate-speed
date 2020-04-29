"use strict";
// import modules
const fs = require('fs');
const csv = require('csv');


if (!process.argv[2] || !process.argv[3]){
    return console.error("Please pass two files as a command line arguments...")
}

function errHandler(err){
    if(err) return console.error(err)
}
const dinoInfo = process.argv[2]
const additionalDinoInfo = process.argv[3]


function csvProcessor(filename, callback){
    fs.readFile(filename, (err, data) => {
        errHandler(err);
        csv.parse(data, (err, parsedData) => {
            errHandler(err);
            return callback(null, parsedData)
        })
    })
}

csvProcessor(additionalDinoInfo, (err, data) => {
    const bipedalDinosaurs = {}
    errHandler(err);
    for (let i = 1; i < data.length; i++){
        if(data[i][2] == 'bipedal'){
            bipedalDinosaurs[data[i][0]] = data[i][1]
        }
    }
    csvProcessor(dinoInfo, (err, data) => {
        errHandler(err);
        const dinos = []
        for (let i = 1; i < data.length; i++){
            if(data[i][0] in bipedalDinosaurs){
                const strideLength = bipedalDinosaurs[data[i][0]]
                const legLength = data[i][1]
                dinos.push({ 
                    name: data[i][0], 
                    speed: ((strideLength / legLength - 1) * Math.sqrt(legLength * 9.81)).toFixed(3)
                });
            }
        }
        dinos.sort((a, b) => a.speed - b.speed).reverse().forEach(dino => {
            console.log(`${dino.name}: ${dino.speed}`)
        })
    })
})
