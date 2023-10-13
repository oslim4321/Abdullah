const { auth } = require("@/config/firebase");
const { signOut } = require("firebase/auth");

// Logout user
const logout = async () => {
  await signOut(auth)
    .then(() => console.log("logout"))
    .catch((e) => console.log("error", e));
};

const authApi = {
  logout,
};

export default authApi;
