const express = require('express')

// import * as tf from '@tensorflow/tfjs';
const tf = require('@tensorflow/tfjs')
// const model = require('./')

const app = express()

const PORT = 3000

// const model = await tf.loadLayersModel('https://foo.bar/tfjs_artifacts/model.json');
const loadLayersModel = async () => {
    return await tf.loadLayersModel('./tfjs-models/model.json');
}
const model = loadLayersModel()

app.get('/', (req, res) => {
    const rs = req.params('q')
    res.send(`rs::::${rs}`)
})


app.listen(PORT, ()=>{
    console.log('Server is start');
})