import conf from '../conf/conf.js'
import {Client, ID, Databases, Storage, Query} from 'appwrite'

export class Service{
    client = new Client();
    databses;
    bucket;
    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.databses = new Databases(this.client);
        this.bucket = new Storage(this.bucket);
    }
    async createPost({title, slug, content, featuredImage, status, userId}){
        try {
            return await this.databses.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )
        } catch (error) {
            console.log("Appwrite service :: createPost :: error", error);
        }
    }
    async updatePost(slug, {title, content, featuredImage, status}){
        try {
            return await this.databses.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
        } catch (error) {
            console.log("Appwrite service :: createPost :: error", error);
        }
    }
    async deleteDocument({slug}){
        try {
            await this.databses.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            true
        } catch (error) {
            console.log("Appwrite service :: createPost :: error", error);
            return false
        }
    }
    async getPost(slug){
        try {
            return await this.databses.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
            )
        } catch (error) {
            console.log("Appwrite service :: createPost :: error", error);
            return false
        }
    }
    async getPosts(queries = [Query.equal("status","active")]){
        try {
            return await this.databses.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
            )
        } catch (error) {
            console.log("Appwrite service :: createPost :: error", error);
            return false
        }
    }
    // file upload service
    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite service :: createPost :: error", error);
            return false
        }
    }
    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite service :: createPost :: error", error);
            return false
        }
    }
    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }
}
const service = new Service()
export default Service;