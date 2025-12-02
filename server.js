const express = require ("express");
const cors = require("cors");
const multer = require("multer");
const mongoose = require("mongoose");
const Joi = require("joi");
const app = express();
app.use(express.static("public"));
app.use(express.json());
app.use(cors());

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./public/images/");
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
});
  
const upload = multer({ storage: storage });

mongoose 
    .connect(
        "mongodb+srv://chanceforcode_db_user:ChanceDatabaseeePassword@app-prospecter.jt7rd5x.mongodb.net/"
    )
    .then ( () => {
        console.log("Conneceted to MongoDB");
    })
    .catch( (error) => {
        console.log("Error connecting to MongoDB", error);
    });

    // Mongoose already includes the _id field by default
    const appScheme = new mongoose.Schema({
        name: String,
        company: String,
        industry: String,
        rating: Number,
        rating_count: Number,
        developer: String,
        note: String,
        app_store_url: String,
        website_url: String,
        image: String
    })
//  Gateway to interacting with Database, utilize apps schema 
const App = mongoose.model("App", appScheme);

// let apps = [
//     {
//         "_id": 1,
//         "name": "Bank App",
//         "image": "finance-image.jpg",
//         "company": "Da Bank",
//         "industry": "Finance",
//         "rating": 2.0,
//         "rating_count": 2,
//         "developer": "WeDevelop",
//         "note": "This banking app is doing bad",
//         "app_store_url": "https://apps.apple.com/us/app/...",
//         "website_url": "https://thebankapp.com"

//     }, 
//     {
//         "_id": 2,
//         "name": "Business App",
//         "image": "business-image.jpg",
//         "company": "Busy Business",
//         "industry": "Consulting",
//         "rating": 2.5,
//         "rating_count": 34,
//         "developer": "Busy Bees Develop",
//         "note": "Users complain about old UI",
//         "app_store_url": "https://apps.apple.com/us/app/...",
//         "website_url": "https://thebusinessapp.com"

//     }, 
//     {
//         "_id": 3,
//         "name": "Car App",
//         "image": "car-image.jpg",
//         "company": "Vroom Vrrom",
//         "industry": "Automotive",
//         "rating": 1.5,
//         "rating_count": 47,
//         "developer": "Car Code Guys",
//         "note": "The app crashes when I click something",
//         "app_store_url": "https://apps.apple.com/us/app/...",
//         "website_url": "https://thecarapp.com"

//     },
//     {
//         "_id": 4,
//         "name": "Food App",
//         "image": "restraunt-image.jpg",
//         "company": "The Dining Gals",
//         "industry": "Food",
//         "rating": 4.0,
//         "rating_count": 87,
//         "developer": "Bytes",
//         "note": "This app is doing everything right",
//         "app_store_url": "https://apps.apple.com/us/app/...",
//         "website_url": "https://thefoodapp.com"

//     },
//     {
//         "_id": 5,
//         "name": "Fitness App",
//         "image": "fitness-image.jpg",
//         "company": "Strong Folk",
//         "industry": "Fitness",
//         "rating": 3.5,
//         "rating_count": 42,
//         "developer": "Foundational Code",
//         "note": "I like how it keeps track of my calories, but  the timer needs work",
//         "app_store_url": "https://apps.apple.com/us/app/...",
//         "website_url": "https://thefitnessapp.com"

//     },
//     {
//         "_id": 6,
//         "name": "Logistics App",
//         "image": "logistics-image.jpg",
//         "company": "Major Trucking",
//         "industry": "Logistics",
//         "rating": 2.0,
//         "rating_count": 236,
//         "developer": "Rotten Apple",
//         "note": "App looks very old could use a overhaul",
//         "app_store_url": "https://apps.apple.com/us/app/...",
//         "website_url": "https://thelogisticsapp.com"

//     },
//     {
//         "_id": 7,
//         "name": "Shopping App",
//         "image": "shopbag-image.jpg",
//         "company": "Shoppy Stuff",
//         "industry": "Retail",
//         "rating": 2.5,
//         "rating_count": 89,
//         "developer": "Broken Windows",
//         "note": "Doesn't save my information properly",
//         "app_store_url": "https://apps.apple.com/us/app/...",
//         "website_url": "https://theshoppingsapp.com"

//     },
//     {
//         "_id": 8,
//         "name": "Travel App",
//         "image": "travel-image.jpg",
//         "company": "Coast 2 Coast",
//         "industry": "Travel",
//         "rating": 3.0,
//         "rating_count": 420,
//         "developer": "Niquidita",
//         "note": "The app doesn't send proper notifications",
//         "app_store_url": "https://apps.apple.com/us/app/...",
//         "website_url": "https://thetravelingapp.com"

//     }
// ]
app.use ((req, res, next) => {
    console.log("Incoming:", req.method, req.url);
    next();
})

app.get("/api/apps/", async (req, res) => {
    console.log("In Get Request for all Apps.");
    const apps = await App.find(); //  Retrieve all apps from the database
    res.send(apps);

});

//  To get a Single App
app.get("/api/apps/:id", async (req, res)=>{
    console.log(`In Get Request for single App ${req.params.id}`);
    // const appItem = apps.find((app)=>app._id === parseInt(req.params.id));
    const appItem = await App.findOne({_id: id }) //  Retrieve a single app by its ID from the database
    res.send(appItem);
});

app.post("/api/apps", upload.single("image"), async (req, res) => {
    const result = validateApp(req.body);

    console.log ("In Post /api/apps");
    console.log("Body:", req.body);
    console.log("File:", req.file);

  if (!req.body) {
    // Nothing parsed into req.body wrong content-type or bad client request
    return res
      .status(400)
      .send("No form fields received. Make sure you are sending FormData.");
  }

   

    if (result.error) {
        console.log("Error adding User app");
        return res.status(400).send(result.error.details[0].message);
       
    }

    const app = new App ({
        name: req.body.name,
        company: req.body.company,
        industry: req.body.industry,
        rating:req.body.rating,
        rating_count: req.body.rating_count,
        developer: req.body.developer,
        note: req.body.note,
        app_store_url: req.body.app_store_url,
        website_url: req.body.website_url,
    })

    // const newApp = {
    //     _id: apps.length + 1,
    //     name: req.body.name,
    //     company: req.body.company,
    //     industry: req.body.industry,
    //     rating: Number(req.body.rating),
    //     rating_count: Number(req.body.rating_count),
    //     developer: req.body.developer,
    //     note: req.body.note,
    //     app_store_url: req.body.app_store_url,
    //     website_url: req.body.website_url,
    //     image: req.file ? req.file.filename : "app-placement-image.jpg"
    // }

    if (req.file) {
        app.image = req.file.filename
    }

    // apps.push(newApp);
    const newApp = await app.save(); //  Save the new app to the database
    res.status(200).send(newApp);
})

app.put("/api/apps/:id", upload.single("image"), async (req, res) =>{
    const isValidEdit = validateApp(req.body);

    console.log(`App ${req.params.id} is trying to be editied`);
    console.log (req.body)

    // const appItem = apps.find(app=>app._id === parseInt(req.params.id));

    if (!appItem) {
        res.status(404).send("The app you wanted to edit is unavailable");
        return;
    }

    if (isValidEdit.error) {
        console.log("Invalid info when editing")
        res.status(400).send(isValidEdit.error.details[0].message)
        return;
    }

    let fieldsToUpdate = {
        name: req.body.name,
        company: req.body.company,
        industry: req.body.industry,
        rating:req.body.rating,
        rating_count: req.body.rating_count,
        developer: req.body.developer,
        note: req.body.note,
        app_store_url: req.body.app_store_url,
        website_url: req.body.website_url,
    }

    // appItem.name = req.body.name;
    // appItem.company = req.body.company;
    // appItem.industry = req.body.industry;
    // appItem.rating = Number(req.body.rating);
    // appItem.rating_count = Number(req.body.rating_count);
    // appItem.developer = req.body.developer;
    // appItem.note = req.body.note;
    // appItem.app_store_url = req.body.app_store_url;
    // appItem.website_url = req.body.website_url;

    if (req.file) {
        // appItem.image = req.file.filename
        fieldsToUpdate.image = req.file.filename;
    }

    const findAppToUpdate = await App.updateOne(
        console.log("Updating App in Database"),
        {_id: req.params.id}, //  update the house with the proivded ID through paramteter
        fieldsToUpdate //  update that house with these fields
    );

    const updatedApp = await App.findOne ({_id: req.params.id});

    res.status(200).send(updatedApp);



})

app.delete ("/api/apps/:id", async (req, res) => {
    console.log(`App ${req.params.id} is trying to be deleted`);
    const appItem = await App.findOneAndDelete({_id: req.params.id});
//    const appItem = apps.find((app)=>app._id === parseInt(req.params.id));

   if (!appItem) {
    res.status(404).send("Can't find the app to delete")
    return;
   }

//    const index = apps.indexOf(appItem);
//    apps.splice(index, 1);
   res.status(200).send(appItem);

})

const validateApp = (app) => {
    console.log("Validating App:", app);
    const schema = Joi.object ({
            _id: Joi.allow(""),
            name: Joi.string().min(1).required(),
            company: Joi.string().min(2).required(),
            industry: Joi.string().min(3).required(),
            rating: Joi.number().required().min(1).max(5),
            rating_count: Joi.number().required().min(1),
            developer: Joi.string().min(1).required(),
            note: Joi.string().min(1).required(),
            app_store_url: Joi.string().min(1).required(),
            website_url: Joi.string().min(1),  
    })

    return schema.validate(app);
}

app.listen(3001, () => {
    console.log("Server is up and running");

});

