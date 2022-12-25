const express = require('express')

// import * as tf from '@tensorflow/tfjs';
const tf = require('@tensorflow/tfjs')
// const tfn = require("@tensorflow/tfjs-node");
// const model = require('./')

const app = express()

const PORT = 3000

// const model = await tf.loadLayersModel('https://foo.bar/tfjs_artifacts/model.json');
// const loadLayersModel = async () => {
//     const handler = tfn.io.fileSystem("./tfjs-models/model.json");
//     return await tf.loadLayersModel(handler);
//     // return await tf.models.modelFromJSON("./tfjs-models/model.json");
// }
// const model = loadLayersModel()

app.get('/', (req, res) => {
    const rs = req.query.q
    console.log(rs);
    res.send(`rs::::${rs}`)
})


app.listen(PORT, ()=>{
    console.log('Server is start');
})