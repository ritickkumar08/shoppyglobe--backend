# shoppyglobe--backend


steps:
    1. setting up the project structure using MVC architecture:
        M - model -> the schemas and collections are to be defined.
        V - view  -> how a webapp's UI will look is defined here, and that is being handled by react in our case.
        C - controllers -> this folder contains the logics.
        we are also haveing Routes folder for -> http wiring clean path definations.

-> database connection:
    -> go to https://cloud.mongodb.com and then after logging in.
    -> create a new project, name it
    -> click on add cluster, it will take to deploy your cluster page.
    -> choose AWS or any service provider 
    -> a region and then create deployment.
    -> you will get the admin userid and its password save it to .env file.

-> npm i mongoose.
        
    
