const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");

module.exports = {
    getbill: async (req, res) => {
        const { userEmail, mydescription, mymedecine, myprice, myname } = req.body;

        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "c4ces.rbk@gmail.com",
                pass: "xgpp ycuf inuu drjy",
            },
            tls: {
                rejectUnauthorized: false,
            },
        });

        let MailGenerator = new Mailgen({
            theme: 'salted',
            product: {
                name: "Medico App",
                link: "https://medicoapp.com/",
            },
        });

        let response = {
            body: {
                name: myname,
                intro: "Your bill has arrived!",
                table: {
                    data: [
                        {
                            Medecine: mymedecine,
                            description: mydescription,
                            price: myprice,
                        },
                    ],
                },
                outro: "Thank you for your purchase!",
            },
        };

        let mail = MailGenerator.generate(response);
        let message = {
            from: "c4ces.rbk@gmail.com",
            to: userEmail,
            subject: "Place Order",
            html: mail,
        };

        transporter
            .sendMail(message)
            .then(() => {
                return res.status(201).json({
                    msg: "You should receive an email",
                });
            })
            .catch((error) => {
                return res.status(500).json({ error: error.message || "Unknown error" });
            });
    },
};
