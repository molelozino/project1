import { default as express } from 'express';
import User from '../model/user.mjs';
import errorHandler from '../helpers/dbErrorHandler.mjs';

export const router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('signin',{email:req.params.email,title:'Sign In'});
});
router.get('/:email', function(req, res, next) {
  res.render('signin',{email:req.params.email,title:'Sign In'});
});

router.post('/', function(req, res) {

   console.log("this is the body",req.body);

  const user = new User(req.body);
  console.log("this is the body",user);
  user.save(function (err, user) {
    if (err){
      console.log(err);
      console.log(errorHandler.getErrorMessage(err));
    res.render('signin', {
      error: errorHandler.getErrorMessage(err)
     });
    return  ;   
    }else{
      res.render('success', { title:"deactivation sucessful" });
      return;
    }
       
  }); 

});


