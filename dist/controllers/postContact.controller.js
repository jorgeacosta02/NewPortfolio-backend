"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { NODEMAILER_USER, NODEMAILER_PASS, DESTINATION_EMAIL } = process.env;
console.log('antes de postContactController');
const postContactController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('recién entrado');
    try {
        const { name, email, subject, message } = req.body;
        console.log('por declarar let transporter');
        // inicia la funcion de recibir el mensaje
        let transporter = nodemailer_1.default.createTransport({
            //options -- define los datos de conexión
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            // host: "smtp.mail.yahoo.com",
            // port: 465,
            // secure: true,
            auth: {
                user: NODEMAILER_USER,
                pass: NODEMAILER_PASS,
            },
            tls: {
                rejectUnauthorized: false, // Desactiva la verificación del certificado
            },
        });
        console.log('después de let transporter');
        // se fusionará en cada objeto de mensaje.
        let mailOptions = {
            from: NODEMAILER_USER,
            to: DESTINATION_EMAIL,
            subject,
            html: `<html>
        <head>
              <body>
              <h3 style="color:#9E7842">Datos del usuario:<h3>
              <p><b>Nombre:</b> ${name}.</p>
              <p><b>Correo electrónico:</b> ${email}</p>
              </br>
              <h3 style="color:#9E7842">Mensaje:</h3>
              <p>${message}.<p>
          </body>
        </head>
      </html>`,
        };
        console.log('antes de sendMail');
        transporter.sendMail(mailOptions, (error, info) => {
            console.log("Error in sendMail callback:", error);
            if (error) {
                return res.status(500).send(error.message);
            }
            else {
                return res.status(200).send("it was sent satisfactorily");
            }
        });
    }
    catch (error) {
        console.log("Error in catch block:", error.message);
        if (error instanceof Error) {
            console.log(error.message);
            return res.status(500).send(error.message);
        }
        else {
            console.log("Unexpected error");
            return res.status(500).send("Unexpected error");
        }
    }
});
exports.default = postContactController;
