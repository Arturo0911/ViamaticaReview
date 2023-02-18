import bcrypt from 'bcryptjs';



export const encryptPassword = async(password: string) =>{
    const hash = await bcrypt.hash(password, 12);
    return hash;
}

export const matchPasswords = async(password: string, 
    possiblePasswords: string) =>{
        try{
            return await bcrypt.compare(password, possiblePasswords);
        }catch(error){
            if (error instanceof Error){
                return false;
            }
        }
    }
