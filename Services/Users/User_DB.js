const db = require('../../models')
const Op = db.Sequelize.Op;

//Function checks if name already exits in database. Returns user if name already taken, false otherwise

async function UsernameExists(firstname){
    if (firstname === null || firstname === undefined) throw new Error('No firstname was passed as an argument')
  const user = await db.user.findOne({
      where:{firstname}
  });
  if(user) return user;
  return null;
}

/*
Function for finding a user based on their user id
@args
-user_id: string

@returns user object
*/
async function FindUser(credential){
    if (!credential) throw new Error('Invalid argument: user_id')
    const user = await db.user.findOne({
        where:{[Op.or]: [
            {firstname:credential}, 
            {id:credential}
        ]}
    });
    if(user) return user;
    return null;
}

//Function checks if emails already exists in database, Return user if email already taken, false otherwise
async function EmailExists(email){
    if (email === null || email === undefined) throw new Error('No email was passed as an argument')
    const user = await db.user.findOne({
        where:{email}
    });
    if(user) return user;
    return null;
}

async function CreateUser(args){
   
    if(!args.firstname) throw new Error('Invalid argument: firstname');    
    if(!args.lastname) throw new Error('Invalid argument: lastname');
    if(!args.email) throw new Error('Invalid argument: email');
    if(!args.password) throw new Error('Invalid argument: password');
    

    // if(!args.permessionid) args.permessionid = 2;

    // const permissions = await _ValidatePermissionId(args.permessionid);
    // if(!permissions) throw new Error('Invalid argument: permissionid not found')

    const user = await db.user.create({
        firstname: args.firstname,
        lastname: args.lastname,
        email: args.email,
        password: args.password
        
        
       });

       return user;
}


module.exports = {
    UsernameExists,
    EmailExists,
    CreateUser,
    FindUser
}