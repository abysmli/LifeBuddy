var express = require('express')
var router = express.Router()
var base64ToImage = require('base64-to-image')
const pythonShell = require('python-shell')

const pythoncode = `
import easyocr
reader = easyocr.Reader(['en','de'])
result = reader.readtext('public/photo.jpg', detail=0)
print(result)
`

/* GET home page. */
router.get('/', function (req, res, next) {
  res.json({ website: 'Life Buddy Demo' })

})

router.post('/photo', function (req, res, next) {
  const imageBase64 = req.body.image
  base64ToImage(imageBase64, process.cwd() + '/public/', {
    fileName: 'photo.jpg'
  })
  pythonShell.PythonShell.runString(pythoncode, null, function (err, results) {
    if (err) {
      res.json({
        EasyOCR: 'EasyOCR parse Error!'
      })
    } else {
      res.json({
        EasyOCR: results[0]
      })
    }
  })
})


module.exports = router;
