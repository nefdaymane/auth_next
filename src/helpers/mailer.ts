import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    // create hashed token
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFIED") {
      await User.findByIdAndUpdate(
        userId,
        {
          verifyToken: hashedToken,
          verifyTokenExpires: Date.now() + 3600000,
        },
        {
          new: true,
          runValidators: true,
        }
      );
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(
        userId,
        {
          forgotPasswordToken: hashedToken,
          forgotPasswordTokenExpires: Date.now() + 3600000,
        },
        {
          new: true,
          runValidators: true,
        }
      );
    }

    // create reusable transporter object using the default SMTP transport

    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "514387e1d1c484",
        pass: "1aeea38b179446",
        //TODO: add these credentials to the .env file
      },
    });

    const mailOptions = {
      from: "aymanenefdaoui03@gmail.com",
      to: email,
      subject:
        emailType === "VERIFIED" ? "Verify your email" : "Reset your password",
      html: `<p>Click 
      <a href="${process.env.domain}/verifyemail?token=${hashedToken}">here</a>
        to
        ${
          emailType === "VERIFIED" ? "verify your email" : "reset your password"
        }

        or copy and paste the following link in your browser
        <br/>
        ${process.env.domain}/verifyemail?token=${hashedToken}
        </p>`,
      };
      
      // send mail with defined transport object
      const mailResponse = await transport.sendMail(mailOptions);

      return mailResponse;


  } catch (error: any) {
    throw new Error(error.message);
  }
};
