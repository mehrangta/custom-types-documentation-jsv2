import fs from 'fs'
import https from 'https'

const types = ["client", "server", "shared"]
const file = ["index.d.ts", "package.json"]

const filesList = types.flatMap(type => file.map(file => `${type}/${file}`));

filesList.forEach(e => {
    const fileUrl = 'https://raw.githubusercontent.com/altmp/altv-js-module-v2/dev/types/' + e;
    const downloadPath = "./packages/" + e;
    const file = fs.createWriteStream(downloadPath);

    https.get(fileUrl, function (response) {
        response.pipe(file);

        file.on('finish', function () {
            file.close(() => {
                console.log(e + ' File downloaded successfully.');
            });
        });
    }).on('error', function (err) {
        fs.unlink(downloadPath, () => { }); // Delete the file async if an error occurs
        console.error('Error downloading file:', err);
    });
});