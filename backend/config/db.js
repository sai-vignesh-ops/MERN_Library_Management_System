import mongoose from 'mongoose';
export const connectDB = async () => {
    mongoose.connect("mongodb+srv://lifeisbtchbr_db_user:gDdBXhBVlxcLkC7n@cluster0.zd14xoa.mongodb.net/LibraryManagement").then(() => {
        console.log("DB connected ");
    })
}