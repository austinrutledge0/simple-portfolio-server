var express = require('express');
var router = express.Router();
var   {buildIssKmlTemplate} = require('../utils/issKmz')
var { v4: uuidv4 } = require('uuid');
var { zip } = require('zip-a-folder');
var fs = require("fs");



router.post('/issKmz', async function(req, res, next) {
  var kml = buildIssKmlTemplate(req.body)
  var kmzDirName = uuidv4();

  fs.mkdir(`./kmzs/tempIssKmzs/${kmzDirName}/files`,  { recursive: true }, err => {
    if (err) throw err;
    fs.writeFile(`./kmzs/tempIssKmzs/${kmzDirName}/doc.kml`, kml, async (err) => {
      if (err) throw err;
      fs.copyFile('./assets/kmlKmzAssets/TrackingDot.svg', `./kmzs/tempIssKmzs/${kmzDirName}/files/dotIcon.svg`, (err) => {
        if (err) throw err;
      });
      fs.copyFile('./assets/kmlKmzAssets/SatelliteIcon.svg', `./kmzs/tempIssKmzs/${kmzDirName}/files/satelliteIcon.svg`, (err) => {
        if (err) throw err;
      });
      const kmz = await zip(`./kmzs/tempIssKmzs/${kmzDirName}`, `./kmzs/tempIssKmzs/${kmzDirName}.kmz`);
      res.download(`./kmzs/tempIssKmzs/${kmzDirName}.kmz`)
    });
  });

});

module.exports = router;
