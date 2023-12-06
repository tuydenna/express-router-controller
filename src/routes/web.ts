import express from "express";
const router = express.Router();
const { pipeline } = require('node:stream/promises');
const fs = require('node:fs');
const zlib = require('node:zlib');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', info: "Learning Nodejs Streaming." });
});

router.get('/streaming', function(req, res, next) {

  async function run() {
      let readStream = fs.createReadStream('./public/video.mp4');
      let writeStream= fs.createWriteStream('./public/video2.mp4');

      return pipeline(
          readStream,
          //zlib.createGzip(),
          async function (source) {
              for await (const chunk of source) {
                  //await fetch('http://localhost:3090/streaming', {body: JSON.stringify({data: "df"}), method: 'POST'});
                  console.log(chunk);
                  //chunk.setEncoding('binary')
                  writeStream.write(chunk);
              }
          },
          //complete
      )

    /*await pipeline(
        fs.createReadStream('./public/video.mp4'),
        async function* (source, { signal }) {
        /!*| 'ascii'
            | 'utf8'
            | 'utf-8'
            | 'utf16le'
            | 'ucs2'
            | 'ucs-2'
            | 'base64'
            | 'base64url'
            | 'latin1'
            | 'binary'
            | 'hex';*!/
            /!*source.setEncoding('s'); *!/ // Work with strings rather than `Buffer`s.
              for await (const chunk of source) {
                  console.log(chunk);
                  //chunk.setEncoding('binary')
                  fs.createWriteStream('./public/video2.mp4').write(chunk)
              }
        },
        /!*fs.createWriteStream('./public/newText.txt'),*!/
    );*/
    console.log('Pipeline succeeded.');
  }

    run().catch(console.error);
        res.render('streaming', { title: 'Express', info: "Learning Nodejs Streaming." });
    });

    router.post('/streaming', (req, res, next) => {
        console.log("streaming", req.body);
        //res.send({data: 1})
    });
    
    router.post('/upload', (req, res, next) => {
        console.log("uploading", req.body);
        //res.send({data: 1})
    });

export default router;