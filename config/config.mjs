const config = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
    mongoUri: process.env.MONGODB_URI ||
      process.env.MONGO_HOST ||
      'mongodb://' + (process.env.IP || 'localhost') + ':' +
      (process.env.MONGO_PORT || '27017') +
      '/godaddyproject', 
  };
  
  export default config;

//  mongodb+srv://precious:precious111@cluster0.0hrx9.mongodb.net/godaddyproject?retryWrites=true&w=majority