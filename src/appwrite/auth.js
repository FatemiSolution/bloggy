import { Client, Account, ID } from "appwrite";
import conf from '../conf/conf'

export class AuthService{
    client = new Client();
    account;
    
    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.projectId);
        this.account = new Account(this.client);

    }
    // create Account
    async createAccount({email, password, name}){
        try {
    const userAccount = await this.account.create(ID.unique(), email, password, name )
    if(userAccount){
        // login
       return this.login({email,password})
    }else{
        return userAccount;
    }
        } catch (error) {
            throw error;
        }
    }
    // login account
    async login({email, password}){
        try {
            return await this.account.createEmailSession(email, password);
        } catch (error) {
            throw error;
        }
    }
    // signOut account 
    async signOut(){
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite serive :: logout :: error", error); 
        }
    }
    // getCurrentUser 
    async getCurrentUser(){
        try {
          return await this.account.get();
        } catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error);
        }
        return null;
    }

}
const authService = new AuthService();
export default authService;