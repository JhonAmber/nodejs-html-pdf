
import pdf from 'html-pdf'
import fs from 'fs'
import path from 'path'

import { GeneratePdf } from '../utils/invoice.pdf.js'

//const template = path.join(__dirname, 'invoice.html')
const html = fs.readFileSync( './src/utils/invoice.html' , 'utf8' );

const options = {
	"format": 'A4',
	"header": {
		"height": "60px"
	},
	"footer": {
		"height": "22mm"
	},
	"base": './src/utils/'
};


export async function getPdf ( req , res ) {

	pdf.create( GeneratePdf() , {format: "A4"}).toStream((err, stream) => {
		if (err) return res.end(err.stack)
		res.setHeader('Content-type', 'application/pdf')
		stream.pipe(res)
	}) 
}

export async function createPdf ( req , res ) {

	pdf.create( GeneratePdf(), {format: "A4"}).toFile('./src/utils/invoice.pdf', function(err, respuesta) {
		if (err) return console.log(err);

		console.log(respuesta)
	});    
}

export async function getPdfHtml ( req , res ) {
	
	res.send(GeneratePdf())
}


