import Header from "../components/header";
import Footer from "../components/footer";
import styles from "../styles/Home.module.scss";
import PublicPrivacyPolicy from "../components/privacyPolicy";
import { getCountryData } from "../utils/country";
import "bootstrap/dist/css/bootstrap.min.css";

const PublicPrivacyPolicyPage = () => {
  const countryData = getCountryData();
  return (
    <div className={styles.container}>
      <Header />
      <PublicPrivacyPolicy />
      <Footer country={countryData} />
    </div>
  );
};

export default PublicPrivacyPolicyPage;
