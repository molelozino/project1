import { default as express } from 'express';
import User from '../model/user.mjs';
import moment from 'moment';
export const router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  User.
  find({})
  .sort({'date': -1})
  .exec(function (err, users) {
    console.log(users);
    const allUsers=users.map(user=>({email:user.email,
                                      password:user.password,
      date:moment(user.date).format('MMMM Do YYYY, h:mm:ss a')}))
    console.log(allUsers)
    if (err){
      console.log(err);
    res.render('admin', {
      title:'admin list',
      error: errorHandler.getErrorMessage(err)
     });
    return  ;   
    }else{
      res.render("admin",{
        title:'admin list',
        users:allUsers
      });
      return;
    }
  });
  
});
