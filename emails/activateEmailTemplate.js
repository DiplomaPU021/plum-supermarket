export const activateEmailTemplate = (email, url) => {
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" style="font-family:Montserrat, sans-serif">
    <head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1" name="viewport">
    <meta name="x-apple-disable-message-reformatting">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="telephone=no" name="format-detection">
    <title>Новий лист</title><!--[if (mso 16)]>
    <style type="text/css">
    a {text-decoration: none;}
    </style>
    <![endif]--><!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]--><!--[if gte mso 9]>
    <xml>
    <o:OfficeDocumentSettings>
    <o:AllowPNG></o:AllowPNG>
    <o:PixelsPerInch>96</o:PixelsPerInch>
    </o:OfficeDocumentSettings>
    </xml>
    <![endif]--><!--[if !mso]><!-- -->
    <link href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" rel="stylesheet"><!--<![endif]-->
    <style type="text/css">
        #outlook a {
            padding: 0;
        }

        .es-button {
            mso-style-priority: 100 !important;
            text-decoration: none !important;
        }

        a[x-apple-data-detectors] {
            color: inherit !important;
            text-decoration: none !important;
            font-size: inherit !important;
            font-family: inherit !important;
            font-weight: inherit !important;
            line-height: inherit !important;
        }

        .es-desk-hidden {
            display: none;
            float: left;
            overflow: hidden;
            width: 0;
            max-height: 0;
            line-height: 0;
            mso-hide: all;
        }

        [data-ogsb] .es-button {
            border-width: 0 !important;
            padding: 10px 30px 10px 30px !important;
        }

        [data-ogsb] .es-button.es-button-1 {
            padding: 10px 30px !important;
        }

        @media only screen and (max-width:600px) {

            p,
            ul li,
            ol li,
            a {
                line-height: 150% !important
            }

            h1,
            h2,
            h3,
            h1 a,
            h2 a,
            h3 a {
                line-height: 120%
            }

            h1 {
                font-size: 42px !important;
                text-align: center
            }

            h2 {
                font-size: 26px !important;
                text-align: center
            }

            h3 {
                font-size: 20px !important;
                text-align: center
            }

            .es-header-body h1 a,
            .es-content-body h1 a,
            .es-footer-body h1 a {
                font-size: 42px !important
            }

            .es-header-body h2 a,
            .es-content-body h2 a,
            .es-footer-body h2 a {
                font-size: 26px !important
            }

            .es-header-body h3 a,
            .es-content-body h3 a,
            .es-footer-body h3 a {
                font-size: 20px !important
            }

            .es-menu td a {
                font-size: 14px !important
            }

            .es-header-body p,
            .es-header-body ul li,
            .es-header-body ol li,
            .es-header-body a {
                font-size: 16px !important
            }

            .es-content-body p,
            .es-content-body ul li,
            .es-content-body ol li,
            .es-content-body a {
                font-size: 16px !important
            }

            .es-footer-body p,
            .es-footer-body ul li,
            .es-footer-body ol li,
            .es-footer-body a {
                font-size: 16px !important
            }

            .es-infoblock p,
            .es-infoblock ul li,
            .es-infoblock ol li,
            .es-infoblock a {
                font-size: 12px !important
            }

            *[class="gmail-fix"] {
                display: none !important
            }

            .es-m-txt-c,
            .es-m-txt-c h1,
            .es-m-txt-c h2,
            .es-m-txt-c h3 {
                text-align: center !important
            }

            .es-m-txt-r,
            .es-m-txt-r h1,
            .es-m-txt-r h2,
            .es-m-txt-r h3 {
                text-align: right !important
            }

            .es-m-txt-l,
            .es-m-txt-l h1,
            .es-m-txt-l h2,
            .es-m-txt-l h3 {
                text-align: left !important
            }

            .es-m-txt-r img,
            .es-m-txt-c img,
            .es-m-txt-l img {
                display: inline !important
            }

            .es-button-border {
                display: block !important
            }

            a.es-button,
            button.es-button {
                font-size: 16px !important;
                display: block !important;
                border-right-width: 0px !important;
                border-left-width: 0px !important;
                border-bottom-width: 15px !important;
                border-top-width: 15px !important
            }

            .es-adaptive table,
            .es-left,
            .es-right {
                width: 100% !important
            }

            .es-content table,
            .es-header table,
            .es-footer table,
            .es-content,
            .es-footer,
            .es-header {
                width: 100% !important;
                max-width: 600px !important
            }

            .es-adapt-td {
                display: block !important;
                width: 100% !important
            }

            .adapt-img {
                width: 100% !important;
                height: auto !important
            }

            .es-m-p0 {
                padding: 0 !important
            }

            .es-m-p0r {
                padding-right: 0 !important
            }

            .es-m-p0l {
                padding-left: 0 !important
            }

            .es-m-p0t {
                padding-top: 0 !important
            }

            .es-m-p0b {
                padding-bottom: 0 !important
            }

            .es-m-p20b {
                padding-bottom: 20px !important
            }

            .es-mobile-hidden,
            .es-hidden {
                display: none !important
            }

            tr.es-desk-hidden,
            td.es-desk-hidden,
            table.es-desk-hidden {
                width: auto !important;
                overflow: visible !important;
                float: none !important;
                max-height: inherit !important;
                line-height: inherit !important
            }

            tr.es-desk-hidden {
                display: table-row !important
            }

            table.es-desk-hidden {
                display: table !important
            }

            td.es-desk-menu-hidden {
                display: table-cell !important
            }

            .es-menu td {
                width: 1% !important
            }

            table.es-table-not-adapt,
            .esd-block-html table {
                width: auto !important
            }

            table.es-social {
                display: inline-block !important
            }

            table.es-social td {
                display: inline-block !important
            }

            .es-m-p5 {
                padding: 5px !important
            }

            .es-m-p5t {
                padding-top: 5px !important
            }

            .es-m-p5b {
                padding-bottom: 5px !important
            }

            .es-m-p5r {
                padding-right: 5px !important
            }

            .es-m-p5l {
                padding-left: 5px !important
            }

            .es-m-p10 {
                padding: 10px !important
            }

            .es-m-p10t {
                padding-top: 10px !important
            }

            .es-m-p10b {
                padding-bottom: 10px !important
            }

            .es-m-p10r {
                padding-right: 10px !important
            }

            .es-m-p10l {
                padding-left: 10px !important
            }

            .es-m-p15 {
                padding: 15px !important
            }

            .es-m-p15t {
                padding-top: 15px !important
            }

            .es-m-p15b {
                padding-bottom: 15px !important
            }

            .es-m-p15r {
                padding-right: 15px !important
            }

            .es-m-p15l {
                padding-left: 15px !important
            }

            .es-m-p20 {
                padding: 20px !important
            }

            .es-m-p20t {
                padding-top: 20px !important
            }

            .es-m-p20r {
                padding-right: 20px !important
            }

            .es-m-p20l {
                padding-left: 20px !important
            }

            .es-m-p25 {
                padding: 25px !important
            }

            .es-m-p25t {
                padding-top: 25px !important
            }

            .es-m-p25b {
                padding-bottom: 25px !important
            }

            .es-m-p25r {
                padding-right: 25px !important
            }

            .es-m-p25l {
                padding-left: 25px !important
            }

            .es-m-p30 {
                padding: 30px !important
            }

            .es-m-p30t {
                padding-top: 30px !important
            }

            .es-m-p30b {
                padding-bottom: 30px !important
            }

            .es-m-p30r {
                padding-right: 30px !important
            }

            .es-m-p30l {
                padding-left: 30px !important
            }

            .es-m-p35 {
                padding: 35px !important
            }

            .es-m-p35t {
                padding-top: 35px !important
            }

            .es-m-p35b {
                padding-bottom: 35px !important
            }

            .es-m-p35r {
                padding-right: 35px !important
            }

            .es-m-p35l {
                padding-left: 35px !important
            }

            .es-m-p40 {
                padding: 40px !important
            }

            .es-m-p40t {
                padding-top: 40px !important
            }

            .es-m-p40b {
                padding-bottom: 40px !important
            }

            .es-m-p40r {
                padding-right: 40px !important
            }

            .es-m-p40l {
                padding-left: 40px !important
            }

            .es-desk-hidden {
                display: table-row !important;
                width: auto !important;
                overflow: visible !important;
                max-height: inherit !important
            }
        }
    </style>
</head>

<body
    style="width:100%;font-family:Montserrat, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0">
    <div class="es-wrapper-color" style="background-color:#FFFFFF"><!--[if gte mso 9]>
    <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
    <v:fill type="tile" color="#ffffff"></v:fill>
    </v:background>
    <![endif]-->
    <table class="es-wrapper" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px; padding: 0; margin: 0; width: 100%; height: 100%; background-repeat: repeat; background-position: center top; background-color: #ffffff;" width="100%" cellspacing="0" cellpadding="0">
    <tbody>
    <tr>
    <td style="padding: 0; margin: 0;" valign="top">
    <table class="es-header" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px; table-layout: fixed !important; width: 100%; background-color: transparent; background-repeat: repeat; background-position: center top;" cellspacing="0" cellpadding="0" align="center">
    <tbody>
    <tr>
    <td style="padding: 0; margin: 0;" align="center">
    <table class="es-header-body" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px; background-color: #ffffff; width: 700px;" cellspacing="0" cellpadding="0" align="center" bgcolor="#ffffff">
    <tbody>
    <tr>
    <td style="margin: 0; padding: 20px 20px 10px 20px;" align="left">
    <table style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px;" width="100%" cellspacing="0" cellpadding="0">
    <tbody>
    <tr>
    <td class="es-m-p0r" style="padding: 0; margin: 0; width: 660px;" align="center" valign="top">
    <table style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px;" role="presentation" width="100%" cellspacing="0" cellpadding="0">
    <tbody>
    <tr>
    <td style="padding: 0; margin: 0; font-size: 0px;" align="center"><a style="-webkit-text-size-adjust: none; -ms-text-size-adjust: none; mso-line-height-rule: exactly; text-decoration: underline; color: #134f5c; font-size: 14px;" href="http://plum.org.ua" target="_blank"><img style="float: left;" src="https://res.cloudinary.com/dzctqbi3o/image/upload/v1683580951/Diploma/email/khcwbpydvwswypjcubfd.png" alt="" width="272" height="46" /></a></td>
    </tr>
    <tr>
    <td style="padding: 0; margin: 0; padding-top: 10px; padding-bottom: 10px; font-size: 0;" align="center">&nbsp;</td>
    </tr>
    <tr>
    <td style="padding: 0; margin: 0;">
    <table class="es-menu" style="border-collapse: collapse; border-spacing: 0px; width: 100%; height: 36px;" role="presentation" width="100%" cellspacing="0" cellpadding="0">
    <tbody>
    <tr class="links" style="height: 36px;">
    <td id="esd-menu-id-0" style="margin: 0px; border: 0px none; padding: 10px 5px; width: 25%; height: 36px;" align="center" valign="top" width="25%"><a style="-webkit-text-size-adjust: none; -ms-text-size-adjust: none; mso-line-height-rule: exactly; text-decoration: none; display: block; font-family: arial, 'helvetica neue', helvetica, sans-serif; color: #333333; font-size: 14px;" href="https://plum.org.ua" target="_blank">Магазин</a></td>
    <td id="esd-menu-id-1" style="margin: 0px; border: 0px none; padding: 10px 5px; width: 25%; height: 36px;" align="center" valign="top" width="25%"><a style="-webkit-text-size-adjust: none; -ms-text-size-adjust: none; mso-line-height-rule: exactly; text-decoration: none; display: block; font-family: arial, 'helvetica neue', helvetica, sans-serif; color: #333333; font-size: 14px;" href="https://plum.org.ua/notebooks" target="_blank">Ноутбуки</a></td>
    <td id="esd-menu-id-2" style="margin: 0px; border: 0px none; padding: 10px 5px; width: 25%; height: 36px;" align="center" valign="top" width="25%"><a style="-webkit-text-size-adjust: none; -ms-text-size-adjust: none; mso-line-height-rule: exactly; text-decoration: none; display: block; font-family: arial, 'helvetica neue', helvetica, sans-serif; color: #333333; font-size: 14px;" href="https://plum.org.ua/" target="_blank">Новинки</a></td>
    <td id="esd-menu-id-2" style="margin: 0px; border: 0px none; padding: 10px 5px; width: 25%; height: 36px;" align="center" valign="top" width="25%"><a style="-webkit-text-size-adjust: none; -ms-text-size-adjust: none; mso-line-height-rule: exactly; text-decoration: none; display: block; font-family: arial, 'helvetica neue', helvetica, sans-serif; color: #333333; font-size: 14px;" href="https://viewstripo.email" target="_blank">Розпродаж</a></td>
    </tr>
    </tbody>
    </table>
    </td>
    </tr>
    <tr>
    <td style="padding: 0; margin: 0; padding-top: 10px; padding-bottom: 10px; font-size: 0;" align="center">&nbsp;</td>
    </tr>
    </tbody>
    </table>
    </td>
    </tr>
    </tbody>
    </table>
    </td>
    </tr>
    </tbody>
    </table>
    </td>
    </tr>
    </tbody>
    </table>
    <table class="es-content" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px; table-layout: fixed !important; width: 100%;" cellspacing="0" cellpadding="0" align="center">
    <tbody>
    <tr>
    <td style="padding: 0; margin: 0;" align="center">
    <table class="es-content-body" style="border-collapse: collapse; border-spacing: 0px; background-color: #ffffff; width: 700px; height: 399px;" cellspacing="0" cellpadding="0" align="center" bgcolor="#ffffff">
    <tbody>
    <tr style="height: 399px;">
    <td style="margin: 0px; padding: 40px 20px 20px; height: 399px; width: 658px;" align="left">
    <table style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px;" width="100%" cellspacing="0" cellpadding="0">
    <tbody>
    <tr>
    <td style="padding: 0; margin: 0; width: 660px;" align="center" valign="top">
    <table style="border-collapse: collapse; border-spacing: 0px; height: 310px; width: 100%;" role="presentation" width="100%" cellspacing="0" cellpadding="0">
    <tbody>
    <tr style="height: 100px;">
    <td style="padding: 0px; margin: 0px; font-size: 0px; height: 100px;" align="center"><img style="display: block; border: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic;" src="https://res.cloudinary.com/dzctqbi3o/image/upload/v1683558652/Diploma/email/ggncjgjqpt4g5p8yso7t.png" alt="" width="100" /></td>
    </tr>
    <tr style="height: 43px;">
    <td style="padding: 0px; margin: 0px; height: 43px;" align="center">
    <h2 style="margin: 0; line-height: 43px; mso-line-height-rule: exactly; font-family: Montserrat, sans-serif; font-size: 36px; font-style: normal; font-weight: normal; color: #333333;">Будь ласка підтвердіть реєстрацію</h2>
    </td>
    </tr>
    <tr style="height: 20px;">
    <td class="es-m-txt-c" style="padding: 10px 0px; margin: 0px; font-size: 0px; height: 20px;" align="center">&nbsp;</td>
    </tr>
    <tr style="height: 96px;">
    <td class="es-m-p0r" style="padding: 5px 40px 5px 0px; margin: 0px; height: 96px;" align="center">
    <p style="margin: 0; -webkit-text-size-adjust: none; -ms-text-size-adjust: none; mso-line-height-rule: exactly; font-family: Montserrat, sans-serif; line-height: 24px; color: #333333; font-size: 16px;">Дякуємо що обрали PLUM.</p>
    <p style="margin: 0; -webkit-text-size-adjust: none; -ms-text-size-adjust: none; mso-line-height-rule: exactly; font-family: Montserrat, sans-serif; line-height: 24px; color: #333333; font-size: 16px;">&nbsp;</p>
    <p style="margin: 0; -webkit-text-size-adjust: none; -ms-text-size-adjust: none; mso-line-height-rule: exactly; font-family: Montserrat, sans-serif; line-height: 24px; color: #333333; font-size: 16px;">Підтвердіть що ця електронна адреса&nbsp;<strong> <a style="-webkit-text-size-adjust: none; -ms-text-size-adjust: none; mso-line-height-rule: exactly; text-decoration: none; color: #134f5c; font-size: 16px;" href="mailto:oksanatestit@gmail.com" target="_blank"> ${email}</a> </strong>ваша перейшовши за посиланням ${url} протягом 48 годин.</p>
    </td>
    </tr>
    <tr>
    <td style="padding: 5px 40px 5px 0px; margin: 0px;">
      <a  href=${url} target="_blank">
      <img style="display: block; margin-left: auto; margin-right: auto;" src="https://res.cloudinary.com/dzctqbi3o/image/upload/v1683559630/Diploma/email/ownq4jztdnbrw3idpxek.png" alt="" width="398" height="33" />
        </a>
        </td>
    </tr>
    </tbody>
    </table>
    </td>
    </tr>
    </tbody>
    </table>
    </td>
    </tr>
    </tbody>
    </table>
    </td>
    </tr>
    </tbody>
    </table>
    <table class="es-footer" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px; table-layout: fixed !important; width: 100%; background-color: transparent; background-repeat: repeat; background-position: center top;" cellspacing="0" cellpadding="0" align="center">
    <tbody>
    <tr>
    <td style="padding: 0; margin: 0;" align="center">
    <table class="es-footer-body" style="border-collapse: collapse; border-spacing: 0px; background-color: #ffffff; width: 700px; height: 188px;" cellspacing="0" cellpadding="0" align="center" bgcolor="#ffffff">
    <tbody>
    <tr style="height: 10px;">
    <td style="padding: 0px 20px; margin: 0px; height: 10px; width: 658px;" align="left">
    <table style="border-collapse: collapse; border-spacing: 0px; height: 10px; width: 0%;" width="100%" cellspacing="0" cellpadding="0">
    <tbody>
    <tr style="height: 10px;">
    <td style="padding: 0px; margin: 0px; width: 100%; height: 10px;" align="left">&nbsp;</td>
    </tr>
    </tbody>
    </table>
    </td>
    </tr>
    <tr style="height: 76px;">
    <td style="padding: 0px 20px; margin: 0px; height: 76px; width: 658px;" align="left"><!-- [if mso]><table style="width:660px" cellpadding="0" cellspacing="0"><tr><td style="width:320px" valign="top"><![endif]-->
    <table class="es-left" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px; float: left;" cellspacing="0" cellpadding="0" align="left">
    <tbody>
    <tr>
    <td class="es-m-p0r es-m-p20b" style="padding: 0; margin: 0; width: 320px;" align="center">
    <table style="border-collapse: collapse; border-spacing: 0px; height: 76px; width: 99.6875%;" role="presentation" width="319" cellspacing="0" cellpadding="0">
    <tbody>
    <tr>
    <td style="padding: 0; margin: 0; padding-top: 15px;" align="center">
    <h3 style="margin: 0; line-height: 24px; mso-line-height-rule: exactly; font-family: Montserrat, sans-serif; font-size: 20px; font-style: normal; font-weight: normal; color: #333333;">Вподобай! Лайкни! Поділись!</h3>
    </td>
    </tr>
    </tbody>
    </table>
    </td>
    </tr>
    </tbody>
    </table>
    <!-- [if mso]></td><td style="width:20px"></td><td style="width:320px" valign="top"><![endif]-->
    <table class="es-right" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px; float: right;" cellspacing="0" cellpadding="0" align="right">
    <tbody>
    <tr>
    <td style="padding: 0; margin: 0; width: 320px;" align="center">
    <table style="border-collapse: collapse; border-spacing: 0px; height: 52px; width: 100%;" role="presentation" width="100%" cellspacing="0" cellpadding="0">
    <tbody>
    <tr style="height: 52px;">
    <td style="padding: 10px 0px; margin: 0px; font-size: 0px; height: 52px;" align="center">
    <table class="es-table-not-adapt es-social" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px;" role="presentation" cellspacing="0" cellpadding="0">
    <tbody>
    <tr>
    <td style="padding: 0px 30px 0px 0px; margin: 0px; text-align: center;" align="center" valign="top"><a style="-webkit-text-size-adjust: none; -ms-text-size-adjust: none; mso-line-height-rule: exactly; text-decoration: underline; color: #134f5c; font-size: 12px;" href="https://viewstripo.email" target="_blank"><img style="display: block; border: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic;" title="Facebook" src="https://zmjfeo.stripocdn.email/content/assets/img/social-icons/square-black-bordered/facebook-square-black-bordered.png" alt="Fb" width="32" /></a></td>
    <td style="padding: 0; margin: 0; padding-right: 30px;" align="center" valign="top"><a style="-webkit-text-size-adjust: none; -ms-text-size-adjust: none; mso-line-height-rule: exactly; text-decoration: underline; color: #134f5c; font-size: 12px;" href="https://viewstripo.email" target="_blank"><img style="display: block; border: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic;" title="Twitter" src="https://zmjfeo.stripocdn.email/content/assets/img/social-icons/square-black-bordered/twitter-square-black-bordered.png" alt="Tw" width="32" /></a></td>
    <td style="padding: 0; margin: 0; padding-right: 30px;" align="center" valign="top"><a style="-webkit-text-size-adjust: none; -ms-text-size-adjust: none; mso-line-height-rule: exactly; text-decoration: underline; color: #134f5c; font-size: 12px;" href="https://viewstripo.email" target="_blank"><img style="display: block; border: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic;" title="Instagram" src="https://zmjfeo.stripocdn.email/content/assets/img/social-icons/square-black-bordered/instagram-square-black-bordered.png" alt="Inst" width="32" /></a></td>
    <td style="padding: 0; margin: 0;" align="center" valign="top"><a style="-webkit-text-size-adjust: none; -ms-text-size-adjust: none; mso-line-height-rule: exactly; text-decoration: underline; color: #134f5c; font-size: 12px;" href="https://viewstripo.email" target="_blank"><img style="display: block; border: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic;" title="Youtube" src="https://zmjfeo.stripocdn.email/content/assets/img/social-icons/square-black-bordered/youtube-square-black-bordered.png" alt="Yt" width="32" /></a></td>
    </tr>
    </tbody>
    </table>
    </td>
    </tr>
    </tbody>
    </table>
    </td>
    </tr>
    </tbody>
    </table>
    </td>
    </tr>
    </tbody>
    </table>
    </td>
    </tr>
    </tbody>
    </table>
    </td>
    </tr>
    </tbody>
    </table>
    <!-- [if mso]></td></tr></table><![endif]--></td>
    </tr>
    <tr style="height: 44px;">
    <td style="padding: 0px 20px; margin: 0px; height: 44px; width: 658px;" align="left">&nbsp;</td>
    </tr>
    <tr style="height: 58px;">
    <td style="padding: 20px; margin: 0px; height: 58px; width: 658px;" align="left">&nbsp;</td>
    </tr>
    </tbody>
    </table>
    </td>
    </tr>
    </tbody>
    </table>
    <table class="es-content" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px; table-layout: fixed !important; width: 100%;" cellspacing="0" cellpadding="0" align="center">
    <tbody>
    <tr>
    <td style="padding: 0; margin: 0;" align="center">&nbsp;</td>
    </tr>
    </tbody>
    </table>
    </td>
    </tr>
    </tbody>
    </table>
    </div>
</body>
    </html>`;
};
