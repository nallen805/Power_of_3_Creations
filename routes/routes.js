//Routing for The Power of 3 Creations

//Required modules
var express = require('express');
var router = express.Router();
var dbmodule = require('../public/javascripts/dbmodule.js');    //Custom module
var path = require('path');

//Home page
router.get('/', function(request,response)
{
    console.log('Request for home page received');
    response.render('home', {title:'Power of 3 Creations', message:'Power of 3 Creations'});
});

//Blog page
router.get('/Blog', function(request, response)
{
    console.log('Request for my-blog received');
    dbmodule.displayBlogPosts(response);
});

//Admin Login page
router.get('/adminLogin', function(request, response)
{
    console.log('Request for Admin Login page received');
    response.render('adminLogin', {title:'Admin Login'});
});

//Authenticate admin user and send to adminSuccess
router.post('/adminSuccess', function(request, response)
{
    console.log('Request for Admin Success page received');
    var username=request.body.username;
    var password=request.body.password;
    dbmodule.authenticateUser(username,password,response);
});

//Admin view all posts
router.get('/viewAll', function(request, response)
{
    console.log('Admin request to view all blogs received');
    dbmodule.adminViewAll(response);
});

//Back to Admin success page -- this isn't working for some reason 
router.get('/adminSuccess', function(request, response)
{
    console.log('Admin request success');
    response.render('adminSuccess', {title:'Admin Success'});
});

//Contact us page
router.get('/Contact', function(request, response)
{
    console.log('Request for Contact Page received');
    response.render('contact', {title:'Contact Us'});
});

//Save contact messages
router.post('/contactSuccess', function(request, response)
{
    console.log('Request for contact success page received');
    //response.render('contactSuccess', {title:'Contact Success'});
    var name=request.body.name;
    var email=request.body.email;
    var msg=request.body.msg;
    dbmodule.addContactMsg(name, email, msg, response);
});

//Show all contact messages to admin
router.get('/showContactMsgs', function(request, response)
{
    console.log('Request for admin show all contact messages received');
    //response.render('showContactMsgs', {title:'Show Admin Contact Messages'});
    dbmodule.showAdminContactMsgs(response);
});

//Create new post for admin
router.get('/Create', function(request, response)
{
    console.log('Request for create post received');
    response.render('createPost', {title:'Create Post'});
});

//Save admin created posts
router.post('/savedPost', function(request, response)
{
    console.log('Saving admin created posts');
    var date=request.body.date;
    var blogname=request.body.blogname;
    var blogdescription=request.body.blogdescription;
    dbmodule.addNewPost(date, blogname, blogdescription, response);
});

//Gallery page
router.get('/Gallery', function(request, response)
{
    console.log('Request for Gallery page received');
    response.render('gallery', {title:'Gallery'});
});

//Custom Request form
router.get('/Custom', function(request, response)
{
    console.log('Request for custom request form received');
    response.render('customRequest', {title:'Custom Request Form'});
}); 

//Save custom requests
router.post('/saveCustomRequest', function(request, response)
{
    console.log('Saved custom request page received');
    var name=request.body.name;
    var email=request.body.email;
    var phone=request.body.phone;
    var customMsg=request.body.customMsg;
    dbmodule.saveCustomRequests(name, email, phone, customMsg, response);
});

//Show custom requests to admin
router.get('/showCustom', function(request, response)
{
    console.log('Request to show all custom requests received');
    dbmodule.showAllCustomRequests(response);
});

//User signs up for blog subscription
router.get('/blogsubscription', function(request, response)
{
    console.log('Request for blog subscription received');
    response.render('blogsubscription', {title:'Blog Subscription'});
});

//Add users who signed up for blog subscription to database
router.post('/savedBlogSubscription', function(request, response)
{
    console.log('Saving blog subscription users');
    var name=request.body.name;
    var email=request.body.email;
    dbmodule.addSubscriptionUsers(name, email, response);
});

//View all blog subscribers
router.get('/showBlogSubscribers', function(request, response)
{
    console.log('Request to show all blog subscribers');
    dbmodule.viewBlogSubscribers(response);
});

module.exports = router;