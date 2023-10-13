
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

export default function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).end();
    }
  
    const { code } = req.body;
    console.log(code);
    
    const isCodeValid = verificationCodes.includes(parseInt(code));

  if (isCodeValid) {
    res.status(200).json({ success:true,status: 'verified' });
  } else {
    res.status(400).json({ success:false,status: 'failed' });
  }

  }
  