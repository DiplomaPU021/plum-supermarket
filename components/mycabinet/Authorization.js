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
  country,
}) {
  if (logShow) {
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
