function checkCashRegister(price, cash, cid) {

    //function rounds up numbers
    const roundToTwoDecimals = function(num){
        return num.toFixed(2);
    }
    //calculate change
    let change = roundToTwoDecimals(cash-price);
    //object for all the required cid values
    const val = {
        //constant nested array for output and calculations
        check:  [
            [0.01,0.05,0.1,0.25,1,5,10,20,100],
            ["PENNY","NICKEL","DIME","QUARTER","ONE","FIVE",
                "TEN","TWENTY","ONE HUNDRED"]
        ]
    };

    //return object
    let msg = {
        status: "",
        change: 0
    }

    //reduce object arr to just cid values
    val.coinsCid = cid.map(x => x.slice(1)).flat();
    //calculate amount of actual currency in cid
    val.have = val.coinsCid.map(function(x){
        return Math.round(val.coinsCid[val.coinsCid.indexOf(x)]
            / val.check[0][val.coinsCid.indexOf(x)]);
    });
    //function to calculate amount of needed coins to cover change
    const calculateNeed = function(change){
        let result =  val.check[0].reverse().map(function(x){
            return Math.floor(change/x);
        }).reverse();
        val.check[0].reverse(); //reverse changes to check key
        return result;
    }
    val.need = calculateNeed(change);

    console.log("Needed: "+val.need+"\nAvailable: "+val.have);
    //recursive function to split change into currency
    const changeSplit = function(change,result){
        if(change<=0){
            return result;
        }else{
            //iterate through need and have arrays in val-object
            for(let i=val.need.length-1;i>=0;i--){
                //if coins/bills are needed for change, check that cid amount >0
                if(val.need[i]>0 && val.have[i]>0){
                    //cid amount of specific coin/bill smaller or bigger than needed
                    if(val.have[i] <= val.need[i]){
                        result.push([val.check[1][i],
                            val.have[i] * val.check[0][i]]);
                        change = roundToTwoDecimals(change-val.have[i] * val.check[0][i]);
                    }else if(val.have[i] > val.need[i]){
                        result.push([val.check[1][i],
                            val.need[i] * val.check[0][i]]);
                        change = roundToTwoDecimals(change - val.need[i]*val.check[0][i]);
                    }
                    //update cid amount of bills and coins as well as new need
                    val.have[i] -= val.need[i];
                    val.need = calculateNeed(change);
                    return changeSplit(change,result);
                }
            }
        }
        //return empty arr if cid is not enough to cover change
        return [];
    }
    msg.change = changeSplit(change,[]);
    //update return object status
    switch(true){
        case(val.have.every(x => x===0)):
            msg.status = "CLOSED";
            msg.change = cid; //show full cid for closed-status
            break;
        case(msg.change.length>0):
            msg.status = "OPEN";
            break;
        default:
            msg.status = "INSUFFICIENT_FUNDS";
            break;
    }

    console.log(msg);

    return msg;
}

checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]);