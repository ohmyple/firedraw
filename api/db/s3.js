
const multer = require('multer')
const multerS3 = require('multer-s3')
const aws = require('aws-sdk')

const accessKey = process.env.AWSAccessKeyId
const secretKey = process.env.AWSSecretKey
const creds = new aws.Credentials(accessKey, secretKey, null)

aws.config.update({
  credentials: creds,
  secretAccessKey: accessKey,
  accessKeyId: secretKey,
  region: 'us-west-1',
})

const s3 = new aws.S3()

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'firedraw-sketches',
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: function(req, file, cb) {
      cb(null, { fieldName: file.fieldname })
    },
    key: function(req, file, cb) {
      cb(null, Date.now().toString())
    },
  }),
})

module.exports = upload
