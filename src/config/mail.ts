import nodemailer from "nodemailer";
import Env from "@/config/env";
const user = Env.get('MAIL_USER');
const pass = Env.get('MAIL_PASSWORD');
const host = Env.get('MAIL_HOST');

const client = nodemailer.createTransport({
    host: host,
    port: 587,
    auth: {
        user,
        pass
    }
});

export default client;
