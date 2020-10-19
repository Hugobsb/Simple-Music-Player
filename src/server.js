const app = require('./app');

const PORT = process.env.PORT || 443;

const SongController = require('./controllers/SongController');

app.listen(PORT, () => {
    console.clear();

    process.stdout.write('\033c');

    console.log('Getting images from songs...');

    SongController.handleSongsAdding().then(() => {
        console.log('\n Starting server...');
        console.log('\x1b[31m'+' server.js'+'\x1b[0m'+' listening to port '+'\x1b[33m'+PORT+'\x1b[0m');
        console.log('\x1b[96m'+' http://localhost:'+PORT+'\x1b[0m');
        console.log('\n /**logs**/\n');
    }).catch(err => console.log(err));
});