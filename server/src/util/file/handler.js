const resSuccess = require('../../responses/res-success');
let path = require('path');
let cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'dkpv3a73a',
  api_key: '319327752335849',
  api_secret: 'bZSWKqMyIW8E8uH9gSbyJnJ_j9w'
});

const postCreate = async (filename) => {
  try {
    // let fileName = filename.
    let uploadFile = await cloudinary.uploader.upload(
      path.join(`${process.cwd()}/uploads/${filename}`),
      {
        resource_type: 'image',
        public_id: `film/${filename}`,
        overwrite: true,
        notification_url:
          'https://cloudinary.com/console/c-4205030a9f5c35e013957834134f1a/media_library/folders/5d68242865dc959266460583adbed53d'
      },
      function (error, result) {
        return {error: error, result: result};
      }
    );

    // console.log('uploadFile', uploadFile);
    return resSuccess(uploadFile.url);
  } catch (error) {
    throw {status: 400, detail: error};
  }
};

module.exports = {
  postCreate
};
