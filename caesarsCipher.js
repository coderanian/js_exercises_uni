function rot13(str) {
    let result = str.split("");
    //construct alphabet array
    const ALPH = Array.from(Array(26))
        .map((e,x) => x+65)
        .map(x => String.fromCharCode(x));
    //regEx checks non-alph values
    const regEx = /\W|_/g;
    /*
    Iterates through char array,
    if index shift > alphabet size reverse shift (e.g. S->F)
    */
    for(let i=0;i<result.length;i++){
        if(!regEx.test(result[i])){
            if(ALPH.indexOf(result[i])+13<ALPH.length){
                result[i] = ALPH[ALPH.indexOf(result[i])+13];
            }else{
                result[i] = ALPH[ALPH.indexOf(result[i])-13];
            };
        };
    };
    result = result.join("");
    return result;
}

rot13("SERR CVMMN!");

