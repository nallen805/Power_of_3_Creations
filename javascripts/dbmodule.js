//Required modules
var mongojs = require('mongojs');
var databaseUrl = "localhost/p3Creations";
var db = mongojs(databaseUrl);
var message=null;


//Display all posts (in descending order)
exports.displayBlogPosts=function(response)
{
    db.BlogPosts.aggregate([{$sort : {date : -1}}], function(err, blogPostDisplay)
    {
        if(err || !blogPostDisplay)
        {
            console.log(err);
            response.render('error', {message:err});
        }

        else 
        {   response.render('my-blog', {blogPost:blogPostDisplay, title:'My Blog', message:'Welcome to my blog'});  }
    });
};

//Validate user
exports.authenticateUser = function(username,password,response)
{
    db.adminUsers.find({"username":username,"password":password}, function(err, adminUsers)
    {
        if(err || !adminUsers)  
        {
            console.log('Not an authorized user');
            response.render('error', {title:'Error', message:err});
        }
        else if(adminUsers.length==0)
        {
            console.log('Not a valid user');
            response.render('adminLogin', {title:'Admin Login', message:'Not a valid user'});
        }
        else
        {
            console.log('Authorized user');
            response.render('adminSuccess', {title:'Admin Success', message:'Welcome'+username});
        }
    });
}

//Admin view all posts
exports.adminViewAll = function(response)
{
    db.BlogPosts.BlogPosts.aggregate([{$sort : {date : -1}}], function(err, adminView)
    {
        if(err || !adminView)
        {   response.render('error', {message:'error'});    }
        else
        {   response.render('viewAll', {posts:adminView, title:'View All', message:'Admin View All'});  }
    });
};

//Add contact messages to database
exports.addContactMsg = function(name, email, message, response)
{
    db.contactMsgs.save({"name":name, "email":email, "message":message}, function(err, saved)
    {
        if(err || !saved)
        {   response.render(err, {message:'error'});    }
        else
        {   response.render('contactSuccess', {title:'Contact Success'});   }
    });
};

//Show admin all contact messages
exports.showAdminContactMsgs = function(response)
{
    db.contactMsgs.find({}, function(err, msgs)
    {
        if(err || !msgs)
        {   response.render('error', {title:'Error', message:'Error'}); }
        else
        {   response.render('showContactMsgs', {contMsg:msgs, title:'Show Contact Messages'});  }
    });
}

//Save admin created posts
exports.addNewPost=function(date, blogname, blogdescription, response)
{
    db.BlogPosts.save({"date":date, "blogname":blogname, "blogdescription":blogdescription}, function(err, saved)
    {
        if(err || !saved)
        {   response.render('error', {message:'error'});    }
        else
        {   response.render('savedPost', {title:'Post Saved'});   }
    });
}

//Save custom requests
exports.saveCustomRequests=function(name, email, phone, customMsg, response)
{
    db.customRequests.save({"name":name, "email":email, "phone":phone ,"customMsg":customMsg}, function(err, saved)
    {
        if(err || !saved)
        {   console.log('Error', {message:'error'});    }
        else
        {   response.render('saveCustomRequest', {title:'Saved Custom Request'});   }
    });
}

//Show admin all custom requests
exports.showAllCustomRequests=function(response)
{
    db.customRequests.find({}, function(err, customRequests)
    {
        if(err || !customRequests)
        {   response.render('Error', {title:'Error'});  }
        else
        {   response.render('showCustomRequests', {custReq:customRequests, title:'Custom Requests Displayed'}); }
    });
}

//Add blog subscription users to database
exports.addSubscriptionUsers=function(name, email, response)
{
    db.blogSubscribers.save({"name":name, "email":email}, function(err, saved)
    {
        if(err || !saved)
        {   response.render('Error', {title:'Error'});  }
        else
        {   response.render('savedBlogSubscription', {title:'Saved Blog Subscription'});    }
    });
}

//View all blog subscribers
exports.viewBlogSubscribers=function(response)
{
    db.blogSubscribers.find({}, function(err, subScribers)
    {
        if(err || !subScribers)
        {   response.render('Error', {title:'Error'});  }
        else
        {   response.render('blogSubscribers', {sub:subScribers, title:'Blog Subscribers'});    }
    });
}