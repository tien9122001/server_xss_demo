const express = require('express')
const tf = require('@tensorflow/tfjs')
const tfn = require("@tensorflow/tfjs-node");
const nodemailer = require('nodemailer')

const app = express()

const PORT = 3000
const EMAIL = 'tien9122001@gmail.com'
const PASSWORD = 'thycumsmilfpxygt'
const TO_EMAIL = 'n19dcat074@student.ptithcm.edu.vn'

const loadLayersModel = async () => {
    const handler = tfn.io.fileSystem("./tfjs-models/model.json");
    const md = await tf.loadLayersModel(handler);
    return md
}

async function sendMail(mailOptions) {
    return new Promise(async (resolve, reject) => {
        try {
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: EMAIL,
                    pass: PASSWORD
                }
            });
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    throw error;
                } else {
                    console.log("Email sent: " + info.response);
                    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
                    resolve("Email sent: " + info.response);
                }
            });
        } catch (error) {
            reject(error);
        }
    });
}

function data2charIndex(X, maxLen) {
    const alphabet = " abcdefghijklmnopqrstuvwxyz0123456789-,;.!?:'\"/\\|_@#$%^&*~`+-=<>()[]{}";
    const result = [];

    for (const data of X) {
        const mat = [];
        for (const ch of data) {
            if (alphabet.includes(ch)) {
                mat.push(alphabet.indexOf(ch));
            }
        }
        result.push(mat);
    }

    const paddedResult = result.map(mat => {
        while (mat.length < maxLen) {
            mat.push(0);
        }
        return mat;
    });

    return paddedResult;
}


app.get('/', async (req, res) => {
    const rs = req.query.q
    let lst = [rs]
    let lst_ = data2charIndex(lst, 1000)
    const model = loadLayersModel()
    model.then(async function (res) {
        const prediction = res.predict(tf.tensor(lst_));
        console.log(prediction.dataSync()[0] > 0.5 ? "TRUE" : "FALSE");
        if (prediction.dataSync()[0] > 0.5) {
            await sendMail({
                from: EMAIL,
                to: TO_EMAIL,
                subject: "CANH BAO TAN CONG XSS",
                text: `DAU HIEU TAN CONG ${rs}`,
            });
        }
    }, function (err) {
        console.log(err);
    });
    res.send(`rs::::${rs}`)
})



app.listen(PORT, () => {
    console.log('Server is start');
})