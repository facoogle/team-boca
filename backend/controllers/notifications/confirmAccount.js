import nodemailer from "nodemailer"



export default function confirmAccount(user){
    let transporter = nodemailer.createTransport({
      host: `${process.env.HOST_EMAIL}`,
      port: `${process.env.PORT_EMAIL}`,
      secure: false,
      auth: {
        user: `${process.env.EMAIL}`,
        pass: `${process.env.EMAIL_PASS}`,
      },
    });
    
    const urlConfirm = "http://localhost:3000/"
  
    return transporter
      .sendMail({
        from: "fanzcars.notifications@gmail.com",
        to: user.email,
        subject: "Bienvenido, por favor confirme su cuenta en FanzCars",
        html: `<p>Confirmar cuenta aqui <a href="${urlConfirm}">Confirmar</a></p>`,
      })
      .then(() => user);
  }

  