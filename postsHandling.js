export const postHandling = {
    registerUser : async (db, userName, age, speciality, acType, password) => {
        db.connect();
        let accontType = null;
        let res;
        if(acType){
            if(acType==="Daily"){ accontType = true}
            else {accontType = false}
            if(speciality){
                await db.query(`INSERT INTO user_table (user_name, age, speciality, account_type, user_password) VALUES ('${userName}', ${age}, '${speciality}', ${accontType}, '${password}')`);
            } else {
                await db.query(`INSERT INTO user_table (user_name, age, account_type, user_password) VALUES ('${userName}', ${age}, ${accontType}, '${password}')`);
            }
        }else if(speciality){
            await db.query(`INSERT INTO user_table (user_name, age, speciality, user_password) VALUES ('${userName}', ${age}, '${speciality}', '${password}')`);
        } else {
            await db.query(`INSERT INTO user_table (user_name, age, user_password) VALUES ('${userName}', ${age}, '${password}')`);
        }
        db.end();
    },
    signUser : (db, userName, password) => {},
    
};