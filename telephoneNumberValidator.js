function telephoneCheck(str) {
    /*egExp equals
    (eps|1)(-| |eps)(([0-9][0-9][0-9])|[0-9][0-9][0-9])
    (-| |eps)[0-9][0-9][0-9](-| |eps)[0-9][0-9][0-9][0-9]
    */
    let regEx = /^1{0,1}(-{0,1}|\s{0,1})(\d{3}|\u0028\d{3}\u0029)(-{0,1}|\s{0,1})\d{3}(-{0,1}|\s{0,1})\d{4}$/g;
    console.log(str.match(regEx));
    return regEx.test(str);
}

console.log(telephoneCheck("27576227382"));