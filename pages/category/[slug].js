import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../../styles/category.module.scss";
import db from "../../utils/db";
import Category from "../../models/Category";
import Header from "../../components/header";
import Footer from "../../components/footer";
import LightPlumIcon from "../../components/icons/LightPlumIcon";
import GreenChevronRight from "../../components/icons/ChevronRight";
import Link from "next/link";
import { Container, Row, Col } from "react-bootstrap";
import CategoryPage from "../../components/categoryPage";
import Brands from "../../components/brands";
import Advice from "../../components/advice";
import GroupSubCategory from "../../models/GroupSubCategory";
import Product from "../../models/Product";
import { getCountryData } from "../../utils/country";

export default function CategorySlug({ country, category, advice, brands }) {
  return (
    <Container fluid className={styles.categorypage}>
      <Header country={country} />
      <Row style={{ padding: "15px  0 0 60px", margin: "0" }}>
        <Col style={{ padding: "0" }}>
          <Link href="/">
            <LightPlumIcon />
            <GreenChevronRight fillColor="#70BF63" w="30px" h="30px" />
          </Link>
          <Link href={category.slug} className={styles.categorypage__link}>
            <span>{category.name}</span>
          </Link>
        </Col>
      </Row>
      <CategoryPage category={category} />
      <Brands brands={brands} />
      <Row className={styles.categorypage__banner}>
        <Col className={styles.categorypage__banner_col1}>
          <div>
            <img src="../../logo/logo_light.png" alt="logo plum light" />
            <span>Допоможе з вибором</span>
          </div>
        </Col>
        <Col className={styles.categorypage__banner_col2}>
          <div>
            <span>Що обрати?</span>
            <span style={{ alignSelf: "flex-end" }}>Як обрати?</span>
            <span>Де купити?</span>
          </div>
        </Col>
      </Row>
      <Advice advice={advice} />
      <Footer country={country} />
    </Container>
  );
}

export async function getServerSideProps(context) {
  const { query } = context;
  const slug = query.slug;

  await db.connectDb();

  let category = await Category.findOne({ slug }).lean();

  let brands = await Product.find({ category: category._id }).distinct("brand");

  let group_subcategories = await GroupSubCategory.aggregate([
    {
      $match: {
        parent: category._id,
      },
    },
    {
      $lookup: {
        from: "subcategories",
        localField: "_id",
        foreignField: "parent",
        as: "group_subcategory",
      },
    },
  ]);

  let newCategory = {
    ...category,
    groups: group_subcategories,
  };

  let newAdvice = {
    title: "Що вибрати – персональний комп'ютер чи ноутбук?",
    text: "Стаціонарні ПК знайшли широке застосування в першу чергу там, де важливий потужний обчислювальний функціонал, забезпечення документообігу та робота з «важкою» графікою. Звичайні та «середньопотужні» пристрої ідеальні для тих, хто інтенсивно працює з браузерами. Найбільш серйозні моделі призначені для відеомонтажу, рендерінга, компіляції масивних програм і складних математичних розрахунків. Безліч варіацій комп'ютерної техніки під конкретні завдання випускають знамениті бренди, серед яких HP, Intel, Lenovo, Dell і навіть Apple. У свою чергу ноутбуки заслужили любов користувачів компактними розмірами і практичністю. Корпус мобільних комп'ютерів об'єднує системний блок, екран і клавіатуру, а також тачпад, вигідно відрізняючись при цьому невеликими габаритами і вагою. Такі пристрої, спеціально створені для успішної автономної роботи, дуже зручно носити з собою і комфортно вирішувати щоденні завдання. Великий вибір моделей, як бюджетного варіанту, так і преміум-класу запропонований багатьма відомими виробниками: Acer, Asus, HP, Apple, Lenovo, Dell, Xiaomi, Panasonic та іншими.",
    photo: "comp.png",
  };

  const countryData = await getCountryData();
  await db.disconnectDb();
  return {
    props: {
      country: countryData,
      category: JSON.parse(JSON.stringify(newCategory)),
      advice: JSON.parse(JSON.stringify(newAdvice)),
      brands: JSON.parse(JSON.stringify(brands)),
    },
  };
}
