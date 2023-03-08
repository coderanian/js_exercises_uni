function palindrome(str) {
    const regEx = /\W|_/g; //find all non-alphanum values
    let strNew = str.toLowerCase().replace(regEx,"");
    console.log(strNew);
    let j = strNew.length-1; //for last letter in str
    for(let i=0;i!=j;i++){
        if(strNew[i]!=strNew[j]){
            return false;
            //if letter on left side != right side
            //stop and return false
        }
        j--;
    }
    return true;
}

console.log(palindrome("eye"));