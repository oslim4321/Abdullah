import nodemailer from 'nodemailer';

/**
 * Sends an email using the Nodemailer library.
 *
 * @param {Object} params - An object containing email parameters.
 * @param {string} params.from - The sender's email address.
 * @param {string} params.to - The recipient's email address.
 * @param {string} params.subject - The email subject.
 * @param {string} params.text - The email text content.
 * @returns {Promise<void>} A promise that resolves when the email is sent.
 * @throws {Error} Throws an error if sending the email fails.
 */
async function sendMail({ from, to, subject, text,html }) {
   try {
      // Create a Nodemailer transporter configuration.
      let transporter = nodemailer.createTransport({
         host: 'smtp.gmail.com',
         port: 456,
         service: 'gmail',
         auth: {
            user: 'arslanra761@gmail.com',
            pass: 'kxmmteibipuzyinv',
         },
      });

      // Send the email using the configured transporter.
      await transporter.sendMail({
         from: `Maglo <${from}>`,
         to,
         subject,
         text,
         html
      });
   } catch (error) {
      // Log and re-throw any errors that occur during the email sending process.
      console.log(error);
      throw new Error(error);
   }
}

export default sendMail
