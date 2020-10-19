const fs = require('fs');
const path = require('path');

const mm = require('music-metadata');

module.exports = {
    async handleSongsAdding() {
        const files = fs.readdirSync(path.join(__dirname, '..', 'songs')).filter(a => !a.includes('png'));

        let promisesArray = [];
        
        for (let i in files) {
            promisesArray.push(mm.parseFile(path.join(__dirname, '..', 'songs', files[i])));
        }

        return Promise.all(promisesArray).then(metadata => {
            for (let i in metadata) {
                const imageBuffer = metadata[i].common.picture[0].data;
                
                const imageTitle = `${metadata[i].common.title} - ${metadata[i].common.artist}`;
                
                if (typeof imageBuffer !== "undefined") {
                    fs.renameSync(path.join(__dirname, '..', 'songs', files[i]), path.join(__dirname, '..', 'songs', imageTitle + files[i].slice(files[i].lastIndexOf('.'))));
                    fs.writeFileSync(path.join(__dirname, '..', 'songs', `${imageTitle}.png`), imageBuffer);
                }
            }
        }).catch(err => console.log(err));
    },

    getSongs(_, res) {
        fs.readdir(path.join(__dirname, '..', 'songs'), (err, files) => {
            if (err) return console.log(err);
            
            let promisesArray = [];
            let response = [];
            let imagesArray = files.filter(a => a.includes('png'));

            files = files.filter(a => !a.includes('png'));

            for (let i in files) {
                promisesArray.push(mm.parseFile(path.join(__dirname, '..', 'songs', files[i])));
            }

            Promise.all(promisesArray).then(metadata => {
                for (let i in metadata) {
                    if (typeof imagesArray[i] === 'string') {
                        if (files[i].replace(files[i].slice(files[i].lastIndexOf('.')), '') === imagesArray[i].replace(imagesArray[i].slice(imagesArray[i].lastIndexOf('.')), '')) {
                            response.push({
                                path: '/songs/'+files[i],
                                image: '/songs/'+imagesArray[i],
                                artist: metadata[i].common.artist,
                                title: metadata[i].common.title
                            });
                        } else {
                            response.push({
                                path: '/songs/'+files[i],
                                artist: metadata[i].common.artist,
                                title: metadata[i].common.title
                            });
                        }
                    } else {
                        response.push({
                            path: '/songs/'+files[i],
                            artist: metadata[i].common.artist,
                            title: metadata[i].common.title
                        });
                    }
                }

                res.json(response);
            })
            .catch(err => {
                console.error(err.message);
            });
        });
    }
};