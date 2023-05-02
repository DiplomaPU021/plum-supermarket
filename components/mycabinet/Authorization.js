import ProfilePage from "./userprofile/ProfilePage";
import Congrats from "./Congratulate";
import LogIn from "./LogIn";
import Register from "./Register";

export default function Authorization({
  logShow,
  regShow,
  congratsShow,
  userProfileShow,
  setLogShow,
  setRegShow,
  setCongratsShow,
  setAuthShow,
  setUserProfileShow,
  signOutHandler,
  user,
  setUser,
  orders,
  country
}) {
  if (logShow) {
    console.log("LOG IN");
    return (
      <LogIn
        setRegShow={setRegShow}
        setLogShow={setLogShow}
        setCongratsShow={setCongratsShow}
        setAuthShow={setAuthShow}
        setUserProfileShow={setUserProfileShow}
        setUser={setUser}
      />
    );
  }
  if (regShow) {
    console.log("REG");
    return (
      <Register
        setRegShow={setRegShow}
        setLogShow={setLogShow}
        setCongratsShow={setCongratsShow}
        setAuthShow={setAuthShow}
        setUserProfileShow={setUserProfileShow}
      />
    );
  }
  if (congratsShow) {
    console.log("Congrats");
    return (
      <Congrats
        setRegShow={setRegShow}
        setLogShow={setLogShow}
        setCongratsShow={setCongratsShow}
        setAuthShow={setAuthShow}
        setUserProfileShow={setUserProfileShow}
      />
    );
  }
  if (userProfileShow) {
    console.log("UserProfile");
    return (
      <ProfilePage
        setRegShow={setRegShow}
        setLogShow={setLogShow}
        setCongratsShow={setCongratsShow}
        setAuthShow={setAuthShow}
        setUserProfileShow={setUserProfileShow}
        signOutHandler={signOutHandler}
        user={user}
        orders={orders}
        country={country}
      />
    );
  }
}
