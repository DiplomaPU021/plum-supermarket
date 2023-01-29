import {
  FacebookShareButton,
  FacebookMessengerShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  EmailShareButton,
} from "react-share";
import {
  FacebookIcon,
  FacebookMessengerIcon,
  LinkedinIcon,
  TelegramIcon,
  WhatsappIcon,
  EmailIcon,
} from "react-share";
import styles from "./styles.module.scss";

export default function Share() {
  return (
    <div className={styles.share}>
      <FacebookShareButton url="https://www.facebook.com/dialog/send">
        <FacebookIcon size={38} />
      </FacebookShareButton>
      <FacebookMessengerShareButton url="https://www.facebook.com/dialog/send">
        <FacebookMessengerIcon size={38} />
      </FacebookMessengerShareButton>
      <LinkedinShareButton url="https://linkedin.com/shareArticle">
        <LinkedinIcon size={38} />
      </LinkedinShareButton>
      <TelegramShareButton url={window?.location.href}>
        <TelegramIcon size={38} />
      </TelegramShareButton>
      <WhatsappShareButton url={window?.location.href}>
        <WhatsappIcon size={38} />
      </WhatsappShareButton>
      <EmailShareButton url={window?.location.href}>
        <EmailIcon size={38} />
      </EmailShareButton>
    </div>
  );
}
