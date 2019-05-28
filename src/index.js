
import app from './app';
import '@babel/polyfill';


async function main () {
    await app.listen( app.get('port') );
    console.log('Server on port ' + app.get('port') );
};

main();