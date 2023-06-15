import Header from "../components/header";
import Footer from "../components/footer";
import styles from "../styles/Home.module.scss";
import { getCountryData } from "../utils/country";
import "bootstrap/dist/css/bootstrap.min.css";
import TermsOfService from "../components/termsOfService";

const PublicPrivacyPolicyPage = () => {
  const countryData = getCountryData();
  return (
    <div className={styles.container}>
      <Header />
      <TermsOfService />
      <Footer country={countryData} />
    </div>
  );
};

export default PublicPrivacyPolicyPage;
