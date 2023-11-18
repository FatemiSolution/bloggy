const conf = {
    appwriteUrl : String(import.meta.env.REACT_APP_APPWRITE_URL),
    projectId : String(import.meta.env.REACT_APP_APPWRITE_PROJECT_ID ),
    databaseId : String(import.meta.env.REACT_APP_APPWRITE_DATABASE_ID),
    collectionId : String(import.meta.env.REACT_APP_APPWRITE_COLLECTION_ID),
    bucketId : String(import.meta.env.REACT_APP_APPWRITE_BUCKET_ID),
}
export default conf;