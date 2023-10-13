
import sendMail from '../../lib/sendMail';
import {codeEmailTemplate} from '../../services/codeEmailTemplate'
import {welcomeSellerTemplate} from '../../services/welcomeSellerTemplate'

// export const verificationCodes = generateRandomCodes(50);
const verificationCodes = [
  758163, 387611, 733363, 739153, 293930,
  157202, 550710, 640827, 775884, 188470,
  598366, 590618, 172374, 430823, 218964,
  754716, 168166, 352756, 895337, 333146,
  944373, 984034, 744490, 693352, 525748,
  419068, 951104, 856929, 265444, 302768,
  794304, 678558, 161470, 174692, 112339,
  962998, 659211, 663684, 432946, 576908,
  983343, 505711, 986096, 582575, 178758,
  388620, 724741, 891359, 300675, 450477
]

function generateRandomCodes(count) {
    const codes = [];
    for (let i = 0; i < count; i++) {
      const code = Math.floor(100000 + Math.random() * 900000); // 6-digit code
      codes.push(code);
    }
    return codes;
  }

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  const { email ,emailType} = req.body;
  const randomCodeIndex = Math.floor(Math.random() * verificationCodes.length);
  const randomCode = verificationCodes[randomCodeIndex];


  const emailEnum = {
    sendCode:async () => await sendMail({
        from: 'aaa.abdullah@yahoo.com',
        to: email,
        subject: 'Email Verification Code',
        text: `Your verification code is: ${randomCode}`,
        html:codeEmailTemplate({email,code:randomCode})
      }),
  
    welcomeSeller:async ()=> await sendMail({
        from: 'aaa.abdullah@yahoo.com',
        to: email,
        subject: 'Welcome Seller',
        text: `Welcome to Maglo. Once your account is approved, you will be able to login, and you will receive email notifications.`,
        html:welcomeSellerTemplate({email})
      }),
  };

  if (!emailEnum[emailType]) {
    return res.status(400).json({ error: 'Invalid emailType' });
  }

  try {

    

    await emailEnum[emailType]()

    res.status(200).json({ success:true,message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({message: 'Failed to send email',success:false });
  }
}
