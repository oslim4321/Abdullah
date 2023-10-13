const welcomeSellerTemplate = ({ email, code }) => {
    return `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta property="og:title" content="Proto.io Email Template">
  <title>Proto.io Email Template</title>
  <style type="text/css">
    #outlook a{
      			padding:0;
      		}
      		body{
      			width:100% !important;
      			-webkit-text-size-adjust:none;
      			margin:0;
      			padding:0;
      		}
      		img{
      			border:none;
      			font-size:14px;
      			font-weight:bold;
      			height:auto;
      			line-height:100%;
      			outline:none;
      			text-decoration:none;
      			text-transform:capitalize;
      		}
      		#backgroundTable{
      			height:100% !important;
      			margin:0;
      			padding:10px;
      			width:100% !important;
      		}
      		body,.backgroundTable{
      			background-color:rgba(235,235,235,0.59);
      		}
      		h1,.h1{
      			color:#000;
      			display:block;
      			font-family:Open Sans,Arial;
      			font-size:24px;
      			font-weight:lighter;
      			line-height:100%;
      			margin-bottom:30px;
      			text-align:left;
      		}
      		h2,.h2{
      			color:#000;
      			display:block;
      			font-family:Open Sans,Arial;
      			font-size:22px;
      			font-weight:lighter;
      			line-height:100%;
      			margin-bottom:20px;
      			text-align:left;
      		}
      		h3,.h3{
      			color:#000;
      			display:block;
      			font-family:Open Sans,Arial;
      			font-size:18px;
      			font-weight:lighter;
      			line-height:100%;
      			margin-bottom:10px;
      			text-align:left;
      		}
      		h4,.h4{
      			color:#000;
      			display:block;
      			font-family:Open Sans,Arial;
      			font-size:14px;
      			font-weight:bold;
      			line-height:100%;
      			margin-bottom:10px;
      			text-align:left;
      		}
      		.preheaderContent div{
      			color:#fff;
      			font-family:Open Sans,Arial;
      			font-size:10px;
      			line-height:100%;
      			text-align:left;
      		}
      		.preheaderContent div a:link,.preheaderContent div a:visited{
      			color:#00A1C0;
      			font-weight:normal;
      			text-decoration:underline;
      		}
      		.preheaderContent div img{
      			height:auto;
      			max-width:600px;
      		}
      		#templateContainer{
      			background:white;
      		}
      		#templateHeader{
      			background-color:#FFFFFF;
      			border-bottom:0;
      			max-width:520px;
      			width:100%;
      		}
      		.themeBack{
      			max-width:600px;
      			padding:36px 0 189px 0;
      			background:no-repeat center auto 100%;
      		}
      		.headerContent{
      			color:#000;
      			font-family:Open Sans, Arial;
      			font-size:11px;
      			font-weight:bold;
      			line-height:100%;
      			padding:30px 20px 0px 20px;
      			vertical-align:middle;
      		}
      		.headerContent a:link,.headerContent a:visited{
      			color:#00A1C0;
      			font-weight:normal;
      			text-decoration:underline;
      		}
      		#headerImage{
      			height:auto;
      			max-width:600px !important;
      		}
      		.bodyContent{
      			background-color:#fff;
      		}
      		.bodyContent .bodyContentArea{
      			margin:50px 20px 0px 20px;
      			padding-bottom:30px;
      			color:#000;
      			font-family:Open Sans,Arial;
      			font-size:12px;
      			line-height:150%;
      			text-align:left;
      			border-bottom:1px solid #EBEBEB;
      		}
      		.bodyContent .bodyContentArea a:link,.bodyContent .bodyContentArea a:visited{
      			color:#00A1C0;
      			font-weight:normal;
      			text-decoration:underline;
      		}
      		.bodyContent img{
      			display:inline;
      			margin-bottom:10px;
      		}
      		.bodyContent li{
      			color:#00A1C0;
      			padding-bottom:5px;
      			padding-top:5px;
      		}
      		.bodyContent li span{
      			color:#222222;
      		}
      		.bodyContent .btn{
      			border:1px solid #00A1C0;
      			padding:10px;
      			text-align:center;
      		}
      		.bodyContent .bodyContentArea .btn a:link,.bodyContent .bodyContentArea .btn a:visited{
      			text-decoration:none;
      		}
      		.bodyContent .btn span{
      			color:#00A1C0;
      			text-transform:uppercase;
      			margin:0 20px;
      			font-size:14px;
      			font-family:Open Sans,Arial;
      		}
      		.bodyContent .btnOuterDark .btn{
      			background:#00A1C0;
      		}
      		.bodyContent .btnOuterDark .btn span{
      			color:white;
      		}
      		#templateFooter{
      			border-top:0;
      		}
      		.footerContent div{
      			color:rgba(235,235,235,0.59);
      			font-family:Open Sans, Arial;
      			font-size:12px;
      			line-height:125%;
      			text-align:left;
      		}
      		.footerContent div a:link,.footerContent div a:visited{
      			color:#00A1C0;
      			font-weight:normal;
      			text-decoration:underline;
      		}
      		.footerContent img{
      			display:inline;
      		}
      		#learnMore{
      			background-color:#fff;
      			color:#000;
      		}
      		#learnMore div{
      			color:#000;
      			font-size:10px;
      			line-height:165%;
      			text-align:center;
      		}
      		#social{
      			background-color:#fff;
      			padding:0 0 20px 0;
      		}
      		#social img{
      			padding:0 4px;
      		}
      		#addressArea{
      			border-top:1px solid #F5F5F5;
      			background:#f2f2f2;
      		}
      		#addressArea div{
      			text-align:center;
      			color:#606060;
      			font-family:Open Sans, Arial;
      			font-size:10px;
      			line-height:165%;
      		}
      		#addressArea div a:link,#addressArea div a:visited{
      			color:#404040;
      			font-weight:normal;
      			text-decoration:underline;
      			font-family:Open Sans,Arial;
      		}
      		.bodyContent .bodyContentArea .usefullLinks{
      			margin:0 auto;
      			text-align:center;
      			width:100%;
      		}
      		.bodyContent .bodyContentArea .usefullLinks a:link,.bodyContent .bodyContentArea .usefullLinks a:visited{
      			text-decoration:none;
      		}
      	@media only screen and (min-device-width: 480px){
      		#learnMore div{
      			padding:0 30px;
      		}
      
      }
  </style>
</head>

<body leftmargin="0" marginwidth="0" topmargin="0" marginheight="0" offset="0" style="-webkit-text-size-adjust: none;margin: 0;padding: 0;background-color: rgba(235,235,235,0.59);width: 100% !important;">
  <center>
    <table border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="backgroundTable" style="margin: 0;padding: 10px;height: 100% !important;width: 100% !important;">
      <tr>
        <td align="center" valign="top">
          <table border="0" cellpadding="0" cellspacing="0" style="max-width: 600px;background: white;" id="templateContainer">
            <tr>
              <td align="center" valign="top">
                <img align="none" src="https://maglo-web-zysoftec.vercel.app/_next/image?url=%2Fassets%2Fbanner.png&w=1920&q=75" style="width: 100%;max-width: 600px;border: none;height: auto;line-height: 100%;outline: none;text-decoration: none;font-size: 14px;font-weight: bold;text-transform: capitalize;">
              </td>
            </tr>
            <tr>
              <td align="center" valign="top">
                <table border="0" cellpadding="0" cellspacing="0" style="max-width:520px;" id="templateBody">
                  <tr>
                    <td valign="top" class="bodyContent" style="background-color: #fff;">
                      <table border="0" cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                      <td valign="top">
                      <div class="bodyContentArea" style="margin: 50px 20px 0px 20px;padding-bottom: 30px;color: #000;font-family: Open Sans, Arial;font-size: 12px;line-height: 150%;text-align: left;border-bottom: 1px solid #EBEBEB;">
                      <p>Dear Seller,</p>
              
                      <p>Thank you for registering on Maglo!</p>
              
                      <p>Your account is now under review. Our team will carefully assess your information and credentials to ensure the highest level of quality and security for our platform.</p>
              
                      <p>Once your account is approved, you will receive a notification by email. You can then log in to Maglo using your registered credentials and start exploring all the features and opportunities that await you.</p>
              
                      <p>We appreciate your interest in joining our community of sellers. If you have any questions or need assistance during this process, please don't hesitate to contact us at <a href="mailto:support@maglo.com">support@maglo.com</a>.</p>
              
                      <p>Thank you for choosing Maglo as your platform for success.</p>
              
                      <p>Best regards,</p>
                      <p>The Maglo Team</p>
                  </div>
                      </td>
                    </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td align="center" valign="top">
              <img src="https://i.ibb.co/q9ftXQ0/download-1.png" width="100px" height="100px" alt="Maglo Logo" border="0" />              
                <table border="0" cellpadding="0" cellspacing="0" style="max-width: 600px;border-top: 0;" id="templateFooter">
                  <tr>
                    <td valign="top" class="footerContent">
                      <table border="0" cellpadding="20" cellspacing="0" width="100%">
                        <tr>
                          <td valign="middle" id="learnMore" style="background-color: #fff;color: #000;">
                            <div style="color: #000;font-family: Open Sans, Arial;font-size: 10px;line-height: 165%;text-align: center;">Looking for more resources? Visit our
                            We are excited to introduce you to Maglo, your trusted partner for all your procurement needs. At Maglo, we understand that sourcing the right parts, products, and services can be a complex and time-consuming process. That's why we've created a platform that simplifies procurement from start to finish.</div>
                          </td>
                        </tr>
                        <tr>
                          <td valign="middle" id="social" style="background-color: #fff;padding: 0 0 20px 0;">
                            <center>
                              <table border="0" cellpadding="10" cellspacing="0">
                                <tr>
                                  <td>
                                    <a href="https://www.facebook.com/protoio?utm_source=Maintenance-0707&utm_campaign=7719cdaae3-Proto_io_Scheduled_Maintenance&utm_medium=email&utm_term=0_791617aea2-7719cdaae3-361329825" class="socialFacebook">
                                      <img src="https://gallery.mailchimp.com/889f464a532f32aaee68a2e7c/images/1478b9d1-8ed0-4f6c-83b3-57815d60392c.png" style="width: 9px;height: 13px;border: none;font-size: 14px;font-weight: bold;line-height: 100%;outline: none;text-decoration: none;text-transform: capitalize;display: inline;padding: 0 4px;">
                                    </a>
                                  </td>
                                  <td>
                                    <a href="https://twitter.com/protoio?utm_source=Maintenance-0707&utm_campaign=7719cdaae3-Proto_io_Scheduled_Maintenance&utm_medium=email&utm_term=0_791617aea2-7719cdaae3-361329825" class="socialTwitter">
                                      <img src="https://gallery.mailchimp.com/889f464a532f32aaee68a2e7c/images/75648c39-c85d-4d9c-9365-b98d6ce080f2.png" style="width: 16px;height: 12px;border: none;font-size: 14px;font-weight: bold;line-height: 100%;outline: none;text-decoration: none;text-transform: capitalize;display: inline;padding: 0 4px;">
                                    </a>
                                  </td>
                                  <td>
                                    <a href="https://dribbble.com/protoio?utm_source=Maintenance-0707&utm_campaign=7719cdaae3-Proto_io_Scheduled_Maintenance&utm_medium=email&utm_term=0_791617aea2-7719cdaae3-361329825" class="socialDribbble">
                                      <img src="https://gallery.mailchimp.com/889f464a532f32aaee68a2e7c/images/85dda49f-18b3-411d-aaf7-6ad4fe296177.png" style="width: 14px;height: 14px;border: none;font-size: 14px;font-weight: bold;line-height: 100%;outline: none;text-decoration: none;text-transform: capitalize;display: inline;padding: 0 4px;">
                                    </a>
                                  </td>
                                </tr>
                              </table>
                            </center>
                          </td>
                        </tr>
                        <tr>
                          <td valign="top" id="addressArea" style="border-top: 1px solid #F5F5F5;background: #f2f2f2;">
                            <div style="color: #606060;font-family: Open Sans, Arial;font-size: 10px;line-height: 165%;text-align: center;">This email was sent to ${email}
                              <br>You got this because you have registered at maglo.com,
                    
                              <br>maglo.com, Inc · 156 2nd street. · San Francisco, CA 94105 · USA</div>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
          <br>
        </td>
      </tr>
    </table>
  </center>
</body>

</html>
    `
}


export { welcomeSellerTemplate }