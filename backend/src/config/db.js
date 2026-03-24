import mongoose from 'mongoose';

export const connectDB=async () =>{
    try {
        await mongoose.connect(
            process.env.MONGODBCONNECTIONSTRING
        );
        console.log('liên kết cơ sở dữ liệu thành công');
    } catch (error) {
        console.error('lỗi khi kết nối cơ sở dữ liệu', error);
        process.exit(1);  //exit with error
    }
}