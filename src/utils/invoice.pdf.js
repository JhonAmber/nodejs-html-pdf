
import fs from 'fs'
import path from 'path'


const url_json = path.join(__dirname, 'invoice.json')


export function GeneratePdf () {

      const json = readJson()

      const invoice = JSON.parse(json)

      return invoiceHTML( invoice )
}

const readJson = ( ) => {
      const json = fs.readFileSync( url_json , 'utf8' );
      return json
}

const invoiceHTML = ( invoice ) => {

      //const html = `cadena de texto ${invoice.serie} texto`
      if ( invoice.tipo_de_comprobante == 1 ) {
            invoice.tipo_de_comprobante = 'FACTURA ELECTRÓNICA'
      }
      if ( invoice.tipo_de_comprobante == 2 ) {
            invoice.tipo_de_comprobante = 'BOLETA DE VENTA ELECTRÓNICA'
      }

      let logo = path.join('file://',__dirname, 'logo.png')


      let table_body = ``

      invoice.items.forEach( ( item ) => {
            table_body += `<tr>
            <td>${item.cantidad}</td>
            <td>${item.unidad_de_medida}</td>
            <td>${item.codigo}</td>
            <td>${item.descripcion}</td>
            <td>${item.valor_unitario}</td>
            <td>${item.precio_unitario}</td>
            <td class="text-right">${item.total}</td>
         </tr>`
      })



      const html = `<html>
      <head>
    <style>
        *, ::after, ::before {
            box-sizing: border-box;
        }
        body {
            margin: 0;
            font-family: Nunito,sans-serif;
            font-size: 10px;
            font-weight: 400;
            line-height: 1.5;
            color: #6c757d;
            text-align: left;
        }
        p {
            margin-top: 0;
            margin-bottom: 1rem;
        }
        address {
            margin-bottom: 1rem;
            font-style: normal;
            line-height: inherit;
            font-size: 8px;
        }
        abbr[data-original-title], abbr[title] {
            text-decoration: underline;
            -webkit-text-decoration: underline dotted;
            text-decoration: underline dotted;
            cursor: help;
            border-bottom: 0;
            -webkit-text-decoration-skip-ink: none;
            text-decoration-skip-ink: none;
        }
        img {
            vertical-align: middle;
            border-style: none;
        }
        .container-fluid {
            width: 100%;
            padding-right: 15px;
            padding-left: 15px;
            margin-right: auto;
            margin-left: auto;
        }
    
        .col-sm-6 {
            -webkit-box-flex: 0;
            flex: 0 0 50%;
            max-width: 50%;
        }
        .offset-sm-2 {
            margin-left: 16.66667%;
        }
        .col-sm-4 {
            -webkit-box-flex: 0;
            flex: 0 0 33.33333%;
            max-width: 33.33333%;
        }  
     
    
        .font-13 {
            font-size: 13px!important;
        }
    
        .text-muted {
            color: #98a6ad!important;
        }
    
    
        /*.row {   
            display: flex;
            flex-wrap: wrap;
            margin-right: -15px;
            margin-left: -15px;
        } */
        .row{display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;margin-right:-15px;margin-left:-15px}
        .col, .col-1, .col-10, .col-11, .col-12, .col-2, .col-3, .col-4, .col-5, .col-6, .col-7, .col-8, .col-9, .col-auto, .col-lg, .col-lg-1, .col-lg-10, .col-lg-11, .col-lg-12, .col-lg-2, .col-lg-3, .col-lg-4, .col-lg-5, .col-lg-6, .col-lg-7, .col-lg-8, .col-lg-9, .col-lg-auto, .col-md, .col-md-1, .col-md-10, .col-md-11, .col-md-12, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8, .col-md-9, .col-md-auto, .col-sm, .col-sm-1, .col-sm-10, .col-sm-11, .col-sm-12, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9, .col-sm-auto, .col-xl, .col-xl-1, .col-xl-10, .col-xl-11, .col-xl-12, .col-xl-2, .col-xl-3, .col-xl-4, .col-xl-5, .col-xl-6, .col-xl-7, .col-xl-8, .col-xl-9, .col-xl-auto {
            position: relative;
            width: 100%;
            padding-right: 15px;
            padding-left: 15px;
        }
        .h1, .h2, .h3, .h4, .h5, .h6, h1, h2, h3, h4, h5, h6 {
            margin: 10px 0;
            font-weight: 700;
        }
        b, strong {
            font-weight: 700;
        }
        .h3, h3 {
            font-size: 1.5rem;
        }
        .col-12 {
            -webkit-box-flex: 0;
            flex: 0 0 100%;
            max-width: 100%;
        }
       
        .mt-3, .my-3 {
            margin-top: 1.5rem!important;
        }
        .mt-4, .my-4 {
            margin-top: 2.25rem!important;
        }
        .float-sm-right {
            float: right!important;
        }
    
        .col-10,.col-11,.col-12,.col-2,.col-3,.col-4,.col-5,.col-6,.col-7,.col-8,.col-9,.col-auto,.col-lg,.col-lg-1,.col-lg-10,.col-lg-11,.col-lg-12,.col-lg-2,.col-lg-3,.col-lg-4,.col-lg-5,.col-lg-6,.col-lg-7,.col-lg-8,.col-lg-9,.col-lg-auto,.col-md,.col-md-1,.col-md-10,.col-md-11,.col-md-12,.col-md-2,.col-md-3,.col-md-4,.col-md-5,.col-md-6,.col-md-7,.col-md-8,.col-md-9,.col-md-auto,.col-sm,.col-sm-1,.col-sm-10,.col-sm-11,.col-sm-12,.col-sm-2,.col-sm-3,.col-sm-4,.col-sm-5,.col-sm-6,.col-sm-7,.col-sm-8,.col-sm-9,.col-sm-auto,.col-xl,.col-xl-1,.col-xl-10,.col-xl-11,.col-xl-12,.col-xl-2,.col-xl-3,.col-xl-4,.col-xl-5,.col-xl-6,.col-xl-7,.col-xl-8,.col-xl-9,.col-xl-auto{position:relative;width:100%;padding-right:15px;padding-left:15px}.col{-ms-flex-preferred-size:0;flex-basis:0;-webkit-box-flex:1;-ms-flex-positive:1;flex-grow:1;max-width:100%}.col-auto{-webkit-box-flex:0;-ms-flex:0 0 auto;flex:0 0 auto;width:auto;max-width:100%}.col-1{-webkit-box-flex:0;-ms-flex:0 0 8.33333%;flex:0 0 8.33333%;max-width:8.33333%}.col-2{-webkit-box-flex:0;-ms-flex:0 0 16.66667%;flex:0 0 16.66667%;max-width:16.66667%}.col-3{-webkit-box-flex:0;-ms-flex:0 0 25%;flex:0 0 25%;max-width:25%}.col-4{-webkit-box-flex:0;-ms-flex:0 0 33.33333%;flex:0 0 33.33333%;max-width:33.33333%}.col-5{-webkit-box-flex:0;-ms-flex:0 0 41.66667%;flex:0 0 41.66667%;max-width:41.66667%}.col-6{-webkit-box-flex:0;-ms-flex:0 0 50%;flex:0 0 50%;max-width:50%}.col-7{-webkit-box-flex:0;-ms-flex:0 0 58.33333%;flex:0 0 58.33333%;max-width:58.33333%}.col-8{-webkit-box-flex:0;-ms-flex:0 0 66.66667%;flex:0 0 66.66667%;max-width:66.66667%}.col-9{-webkit-box-flex:0;-ms-flex:0 0 75%;flex:0 0 75%;max-width:75%}.col-10{-webkit-box-flex:0;-ms-flex:0 0 83.33333%;flex:0 0 83.33333%;max-width:83.33333%}.col-11{-webkit-box-flex:0;-ms-flex:0 0 91.66667%;flex:0 0 91.66667%;max-width:91.66667%}.col-12{-webkit-box-flex:0;-ms-flex:0 0 100%;flex:0 0 100%;max-width:100%}
        .col-sm-auto{-webkit-box-flex:0;-ms-flex:0 0 auto;flex:0 0 auto;width:auto;max-width:100%}.col-sm-1{-webkit-box-flex:0;-ms-flex:0 0 8.33333%;flex:0 0 8.33333%;max-width:8.33333%}.col-sm-2{-webkit-box-flex:0;-ms-flex:0 0 16.66667%;flex:0 0 16.66667%;max-width:16.66667%}.col-sm-3{-webkit-box-flex:0;-ms-flex:0 0 25%;flex:0 0 25%;max-width:25%}.col-sm-4{-webkit-box-flex:0;-ms-flex:0 0 33.33333%;flex:0 0 33.33333%;max-width:33.33333%}.col-sm-5{-webkit-box-flex:0;-ms-flex:0 0 41.66667%;flex:0 0 41.66667%;max-width:41.66667%}.col-sm-6{-webkit-box-flex:0;-ms-flex:0 0 50%;flex:0 0 50%;max-width:50%}.col-sm-7{-webkit-box-flex:0;-ms-flex:0 0 58.33333%;flex:0 0 58.33333%;max-width:58.33333%}.col-sm-8{-webkit-box-flex:0;-ms-flex:0 0 66.66667%;flex:0 0 66.66667%;max-width:66.66667%}.col-sm-9{-webkit-box-flex:0;-ms-flex:0 0 75%;flex:0 0 75%;max-width:75%}.col-sm-10{-webkit-box-flex:0;-ms-flex:0 0 83.33333%;flex:0 0 83.33333%;max-width:83.33333%}.col-sm-11{-webkit-box-flex:0;-ms-flex:0 0 91.66667%;flex:0 0 91.66667%;max-width:91.66667%}.col-sm-12{-webkit-box-flex:0;-ms-flex:0 0 100%;flex:0 0 100%;max-width:100%}
    
    
        
       
        .card {
            position: relative;
            display: flex;
            -webkit-box-orient: vertical;
            -webkit-box-direction: normal;
            flex-direction: column;
            min-width: 0;
            word-wrap: break-word;
            background-color: #fff;
            background-clip: border-box;
            border-radius: .25rem;
        }
        .card {
            border: none;
            -webkit-box-shadow: 0 0 35px 0 rgba(154,161,171,.15);
            margin-bottom: 30px;
        }
        .card-body {
            -webkit-box-flex: 1;
            flex: 1 1 auto;
            padding: 1.5rem;
        }
    
        .mb-3, .my-3 {
            margin-bottom: 1.5rem!important;
        }
        .mt-4, .my-4 {
            margin-top: 2.25rem!important;
        }
        .float-left {
            float: left!important;
        }
        .float-right {
            float: right!important;
        }
    
        .m-0 {
            margin: 0!important;
        }
    
        .h1, .h2, .h3, .h4, .h5, .h6, h1, h2, h3, h4, h5, h6 {
            margin: 10px 0;
            font-weight: 700;
        }
        .h4, h4 {
            font-size: 1.125rem;
        }
        .badge-success {
            color: #fff;
            background-color: #0acf97;
        }
        .badge {
            display: inline-block;
            padding: .25em .4em;
            font-size: 75%;
            font-weight: 700;
            line-height: 1;
            text-align: center;
            white-space: nowrap;
            vertical-align: baseline;
            border-radius: .25rem;
            -webkit-transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;
            transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;
            transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
            transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;
        }
    .table-responsive {
        display: block;
        width: 100%;
        overflow-x: auto;
    }
    .mt-4, .my-4 {
        margin-top: 2.25rem!important;
    }
    
    .table {
        width: 100%;
        margin-bottom: 1.5rem;
        color: #6c757d;
    }
    table {
        border-collapse: collapse;
    }
    .table thead th {
        vertical-align: bottom;
        border-bottom: 2px solid #e3eaef;
    }
    
    .table td, .table th {
        padding: .95rem;
        vertical-align: top;
        border-top: 1px solid #e3eaef;
        font-size: 8px;
    }
    th {
        text-align: inherit;
    }
    
    
    </style> 
      </head>
      <body>
          <div class="container-fluid">
            <div class="row">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-body">
    
                                <!-- Invoice Logo-->
                                <div class="clearfix">
                                    <div class="float-left mb-0">
                                        <img src="${logo}" alt="aaa" height="100">
                                    </div>
                                    <div class="float-right">
                                        <h5 style='font-size:13px;' class="mt-2 d-print-none">${invoice.tipo_de_comprobante}</h5>
                                        <p class="font-13 mt-2" style='text-align: center;'><strong>${invoice.cliente_numero_de_documento}</strong></p>
                                        <p class="font-13 mt-1" style='text-align: center;'><strong>${invoice.serie}-${invoice.numero}</strong> </p>
                                    </div>
                                </div>
    
                                <!-- Invoice Detail-->
                                <div class="row">
                                <!-- <div class="col-sm-6">
                                        <div class="float-left mt-0">
                                            <p><b>Hello, Cooper Hobson</b></p>
                                            <p class="text-muted">Please find below a cost-breakdown for the recent work completed. Please make payment at your earliest convenience, and do not hesitate to contact me with any questions.</p>
                                        </div>
    
                                    </div>-->
                                    <!--  <div class="col-sm-4 offset-sm-2">
                                        <div class="mt-3 float-sm-right">
                                            <p style='font-size:8px;'><strong>Fecha de Emisión: </strong>${invoice.fecha_de_emision}</p> -->
                                          <!--  <p class=""><strong>Order Status: </strong> <span class="badge badge-success float-right">Paid</span></p> -->
                                           
                              <!--   </div>
                                    </div> -->
                                </div>
                                <!-- end row -->
    
                                <div class="row mt-4">
                                    <div class="col-sm-6">
                                        <h6>Datos del cliente :</h6>
                                        <address>
                                            ${invoice.cliente_denominacion}<br>
                                            ${invoice.cliente_numero_de_documento}<br>
                                            ${invoice.cliente_direccion}<br>
                                        </address>
                                    </div> <!-- end col-->
    
                                    <div class="col-sm-6 float-sm-right">
                                        <h6>Shipping Address</h6>
                                        <address>
                                            Cooper Hobson<br>
                                            795 Folsom Ave, Suite 600<br>
                                            San Francisco, CA 94107<br>
                                        </address>
                                    </div> <!-- end col-->
                                </div>    
                                <!-- end row -->        
    
                                <div class="row">
                                    <div class="col-12">
                                        <div class="table-responsive">
                                            <table class="table mt-4">
                                                <thead>
                                                <tr><th>CANT.</th>
                                                    <th>UM</th>
                                                    <th>CÓDIGO</th>
                                                    <th>DESCRIPCION</th>
                                                    <th>V/U</th>
                                                    <th>P/U</th>
                                                    <th class="text-right">IMPORTE</th>
                                                </tr></thead>
                                                <tbody>
                                                ${table_body} 
                                                </tbody>
                                            </table>
                                        </div> <!-- end table-responsive-->
                                    </div> <!-- end col -->
                                </div>
                                <!-- end row -->
    
                                <div class="row">
                                    <div class="col-sm-6">
                                        <div class="clearfix pt-3">
                                            <h6 class="text-muted">Notes:</h6>
                                            <small>
                                                All accounts are to be paid within 7 days from receipt of
                                                invoice. To be paid by cheque or credit card or direct payment
                                                online. If account is not paid within 7 days the credits details
                                                supplied as confirmation of work undertaken will be charged the
                                                agreed quoted fee noted above.
                                            </small>
                                        </div>
                                    </div> <!-- end col -->
                                    <div class="col-sm-6">
                                        <div class="float-right mt-3 mt-sm-0">
                                            <p><b>Sub-total:</b> <span class="float-right">$4120.00</span></p>
                                            <p><b>VAT (12.5):</b> <span class="float-right">$515.00</span></p>
                                            <h4>$4635.00 USD</h4>
                                        </div>
                                    </div> <!-- end col -->
                                </div>
                                <!-- end row-->
    
                            </div> <!-- end card-body-->
                        </div> <!-- end card -->
                    </div> <!-- end col-->
                </div>
            </div>
      </body>
    </html>`



      return html;
}