import Header from '@/components/header';
import styles from "../styles/Home.module.scss";
import PublicPrivacyPolicy from '../components/privacyPolicy';
import Footer from '@/components/footer';

const PublicPrivacyPolicyPage = () => {
  return (
    <div className={styles.container}>
    <Header  />
  <PublicPrivacyPolicy />
  <Footer />
  </div>
  )
};

export default PublicPrivacyPolicyPage;