import { Rating } from "@mui/material";
import { width } from "@mui/system";
import { useSession, signIn } from "next-auth/react";
import session from "redux-persist/lib/storage/session";
import AddReview from "./AddReview";
import styles from "./styles.module.scss";

export default function Reviews({ product }) {
  const { data: session } = useSession();
  return (
    <div className={styles.reviews}>
      <div className={styles.reviews__container}>
        {/* here might be product.reviews.length, not numReviews */}
        <h1>Customer Reviews ({product.numReviews})</h1>
        <div className={styles.reviews__stats}>
          <div className={styles.reviews__stats_overview}>
            <span>Average Raiting</span>
            <div className={styles.reviews__stats_overview_rating}>
              <Rating
                name="half-raiting-read"
                defaultValue={product.rating}
                precision={0.5}
                readOnly
                style={{ color: "#FACF19" }}
              />
              {product.rating == 0 ? "No reviews yet." : product.rating}
            </div>
          </div>
          <div className={styles.reviews__stats_reviews}>
            {product.ratings.map((rating, i) => (
              <div className={styles.reviews__stats_reviews_review} key={i}>
                <Rating
                  name="half-rating-read"
                  defaultValue={5 - i}
                  precision={0.5}
                  readOnly
                  style={{ color: "#FACF19" }}
                />
                <div className={styles.bar}>
                  <div
                    className={styles.bar__inner}
                    style={{ width: `${rating.percentage}%` }}
                  ></div>
                </div>
                <span>{rating.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
        {session ? (
         <AddReview product={product}/>
        ) : (
          <button className={styles.login_btn} onClick={() => signIn()}>
            Log in to add review
          </button>
        )}
      </div>
      {/* the ONE row of code below is temporarly because I could't register */}
      <AddReview product={product}/>
    </div>
  );
}
