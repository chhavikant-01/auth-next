import nodemailer from 'nodemailer';
import User from "@/models/userModel";
import bcryptjs from 'bcryptjs';

export const sendEmail = async({email, emailType, userId}: 
    any) => {
        try{
            const hashedToken = await bcryptjs.hash(userId.toString(), 10);

            if(emailType === 'VERIFY'){
                await User.findByIdAndUpdate(userId, {
                    verifyToken: hashedToken,
                    verifyTokenExpiry: Date.now() + 3600000
                });
            }else if(emailType === 'RESET'){
                await User.findByIdAndUpdate(userId, {
                    forgotPasswordToken: hashedToken,
                    forgotPasswordTokenExpiry: Date.now() + 3600000
                });
            }

            var transport = nodemailer.createTransport({
                host: "sandbox.smtp.mailtrap.io",
                port: 2525,
                auth: {
                  user: process.env.MAIL_TRAP_USER,
                  pass: process.env.MAIL_TRAP_PASS
                }
              });

              const mailOptions = {
                from: 'ckcodes907@gmail.com',
                to: email,
                subject: emailType === 'VERIFY' ? 'Verify your email' : 'Reset your password',
                html: 
                `
                <h1>${emailType === 'VERIFY' ? 'Verify your email' : 'Reset your password'}</h1>
                <p>Click the link below to ${emailType === 'VERIFY' ? 'verify your email' : 'reset your password'}</p>
                <a href="${process.env.domain}/verifyemail?token=${hashedToken}">Click here</a>
                `
              }

              const mailresponse = await transport.sendMail(mailOptions);
              return mailresponse;

        }catch(error: any){
            throw new Error(error);
        }
    }
