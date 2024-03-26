export const postHandling = {
    
    registerUser : async (db, userName, age, speciality, acType, password) => {
        let accontType = null;
        if(acType){
            if(speciality){
                await db.query(`INSERT INTO user_table (user_name, age, speciality, account_type, user_password) VALUES ('${userName}', ${age}, '${speciality}', '${acType}', '${password}')`);
            } else {
                await db.query(`INSERT INTO user_table (user_name, age, account_type, user_password) VALUES ('${userName}', ${age}, '${acType}', '${password}')`);
            }
        }else if(speciality){
            await db.query(`INSERT INTO user_table (user_name, age, speciality, user_password) VALUES ('${userName}', ${age}, '${speciality}', '${password}')`);
        } else {
            await db.query(`INSERT INTO user_table (user_name, age, user_password) VALUES ('${userName}', ${age}, '${password}')`);
        }
        const userID = await db.query(`SELECT * FROM user_table WHERE user_name = '${userName}' AND user_password = '${password}'`);
        return userID.rows[0];
    },
    
    signUser : async (db, userName, password) => {
        let user = null;
        user = await db.query(`SELECT * FROM user_table WHERE user_name = '${userName}' AND user_password = '${password}'`);
        return user.rows[0];
    }    
};