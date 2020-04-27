"use strict";
// import modules
const fs = require('fs');
const csv = require('csv');
const Dinosaur = require('./dinosaur')


if (!process.argv[2] || !process.argv[3]){
    return console.error("Please pass two files as a command line arguments...")
}

function errHandler(err){
    if(err) return console.error(err)
}
const file1 = process.argv[2]
const file2 = process.argv[3]


fs.readFile(file1,(err, data1) => {
    errHandler(err);
    fs.readFile(file2, (err, data2) => {
        errHandler(err);
        csv.parse(data1, (err, parsedData1) => {
            errHandler(err);
            csv.parse(data2, (err, parsedData2) => {
                let dinosaurs = []
                errHandler(err);
                for (let i = 1; i < parsedData2.length; i++){
                    dinosaurs.push(new Dinosaur(parsedData2[i][0], 'undefined',parsedData2[i][1], 'undefined',parsedData2[i][2]))
                }
                dinosaurs.forEach(dinosaur => {
                    for (let j=1; j < parsedData1.length; j++){
                        if(dinosaur.name === parsedData1[j][0]){
                            dinosaur.legLength = parsedData1[j][1]
                            dinosaur.diet = parsedData1[j][2]
                        }
                    }
                })
                dinosaurs.sort((a, b) => a.speed - b.speed).reverse().forEach(dino => {
                    if(!Number.isNaN(dino.speed)) console.log(dino.name)
                })
            })
        })
    })
})
