const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

export const correctInfo = (info) => {
  if (info.name.length >= 3 && info.name.length <= 50) {
    if (info.pass == info.verifyPass) {
      // if (passwordRegex.test(info.pass)) {
        // console.log("regex problem");
        return true;
      // }
    }
  }
  return false;
};
