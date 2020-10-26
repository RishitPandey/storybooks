const mongoose = require('mongoose'),
     connectDB = async () => {
         try {
             //* the connect function is a promise and it returns something
             //* for sure but here we have used async await with promise function
            const conn = await mongoose.connect(process.env.MONGO_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false
            });
            console.log(`MongoDB connected: ${conn.connection.host}`);
         } catch(error) {
            console.log(error);
            process.exit(1);
         }
     }
module.exports = connectDB;