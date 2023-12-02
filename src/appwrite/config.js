import conf from '../conf/conf'
import { Client, Databases, Storage, Query, ID } from "appwrite";
export class Service {
    client = new Client();
    database;
    bucket;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.projectId);
        this.database = new Databases(this.client);
        this.bucket = new Storage(this.client);
        
    }
    async createPost({title, slug, content, featuredImage, status, userID}){
        try {
            return await this.database.createDocument(conf.databaseId,conf.collectionId,slug,{
                title,
            content,
            status,
            userID,
            featuredImage,    

            })
        } catch (error) {
            throw error;
        }
    }
    async updatePost(slug,{title, content, status, featuredImage}){
        try {
            return await this.database.updateDocument(conf.databaseId, conf.collectionId,slug,{
                title,
                content,
                featuredImage,
                status,
            })
            
        } catch (error) {
            console.log("Appwrite serive :: updatePost :: error", error);
        }
    }
    async deletePost(slug){
        try {
             await this.database.deleteDocument(conf.databaseId,conf.collectionId,slug)
             return true;
        } catch (error) {
            console.log("Appwrite serive :: deletePost :: error", error);
            return false;
        }

    }
    async getPost(slug){
        try {
           return await this.database.getDocument(conf.databaseId, conf.collectionId, slug)
        } catch (error) {
            console.log("Appwrite serive :: getPost :: error", error);
            return false
        }
    }
    async getPosts(queries = [Query.equal("status","active")]){
        try {
            return await this.database.listDocuments(
                conf.databaseId,conf.collectionId,queries
            )
        } catch (error) {
            console.log("Appwrite serive :: getPosts :: error", error);
            return false
        }
    }
    //file uploading services
    async uploadFile(file){
        try {
            return await this.bucket.createFile(conf.bucketId,ID.unique(),file)
        } catch (error) {
            throw error;
            return false;
        }
    }
    async deleteFile(fileID){
    try {
         await this.bucket.deleteFile(conf.bucketId,fileID)
            return true;
    } catch (error) {
        throw error;
        return false;
    }
    }
    getFilePreview (fileID){
        return this.bucket.getFilePreview(conf.bucketId,fileID)
    }
}

const service = new Service();
export default service;