import mongoose from 'mongoose';

export const databaseConnection = async () => {

    try{

        await mongoose.connect(process.env.MONGO_URI)
        console.log('Kudos! Database connected successfully')
    
    }catch(error){

        console.error("An error occur",error)

    }
   
}