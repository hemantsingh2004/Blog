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
        const user = await db.query(`SELECT * FROM user_table WHERE user_name = '${userName}' AND user_password = '${password}'`);
        return user.rows[0];
    },
    
    addPost : async (db, userId, title, body, date) => {
        await db.query(`INSERT INTO blog_table (title, body, modify_date, uid) VALUES ('${title}','${body}','${date}',${userId})`);
        return;
    },

    getblogs : async (db, limit, offset, userID) => {
        let data = undefined;
        if(userID){
            data = await db.query(`SELECT * FROM blog_table WHERE uid = ${userID} ORDER BY modify_date DESC LIMIT ${limit} OFFSET ${offset};`);
        } else {
            data = await db.query(`SELECT * FROM blog_table ORDER BY modify_date DESC LIMIT ${limit} OFFSET ${offset};`);
        }
        return data.rows;
    },

    getPost : async (db, blogId) => {
        const data = await db.query(`SELECT * FROM blog_table WHERE blog_id = ${blogId}`);
        return data.rows[0];
    },

    userOwnBlog: async (db, userId, blogId) => {
        const data = await db.query(`SELECT * FROM blog_table WHERE uid = ${userId}`);
        const blogIds = [];
        for(let i of await data.rows){
            blogIds.push(i.blog_id);
        }
        if(blogIds.includes(blogId)){
            return true;
        }
    },

    deleteBlog: async (db, blogId) => {
        await db.query(`DELETE FROM blog_table WHERE blog_id = ${blogId}`);
    },

    editPost: async (db, blogId, text, date) => {
        await db.query(`UPDATE blog_table SET body='${text}', modify_date='${date}' 
                        WHERE blog_id = ${blogId}`);
        console.log("post updated");
    }
};