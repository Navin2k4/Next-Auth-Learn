"use server"
import { getUserByEmail } from "@/data/user"
import { getVerificationTokenByToken } from "@/data/verificationToken"
import {db} from "@/lib/db"


export const newVerification = async (token:string)=>{
    const existingToken = await getVerificationTokenByToken(token);
    if(!existingToken){
        return {error: "Token Does not Exist"}
    }
    const hasExpired = new Date(existingToken.expiresAt) < new Date();
    if(hasExpired){
        return {error: "Token has Expired"}
    }
    const existingUser = await getUserByEmail(existingToken.email);
    if(!existingUser){
        // if user changed the email in the meantime
        return {error: "Email does not Exist"}
    }    
    await db.user.update({
        where:{id:existingUser.id},
        data:{
            emailVerified: new Date(),
            // this updation is email because when the user trys to update the email after signing in 
            email: existingToken.email
        }
    })
    await db.verificationToken.delete({
        where:{
            id: existingToken.id
        }
    })
    return {success: "Email Verification Successful"}
}
