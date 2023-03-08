function convertToRoman(num) {
    const romNums = [
        ["M","CM","D","CD","C","XC","L","XL","X","IX","V","IV","I"],
        [1000,900,500,400,100,90,50,40,10,9,5,4,1]
    ]
    let result = "";
    //iterate until num reaches 0
    while(num>=0){
        let i = 0;
        /*
        iterate through num array if number is >= num in
        array add respective roman number to string and
        substract number from argument
        */
        for(i;i<romNums[0].length;i++){
            if(num>=romNums[1][i]){
                result += romNums[0][i];
                break;
            }
        }
        num-=romNums[1][i];
    }
    console.log(result); //test
    return result;
}

convertToRoman(1400);

