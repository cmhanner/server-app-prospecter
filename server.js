const express = require ("express");
const cors = require("cors");
const multer = require("multer");
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

let apps = [
    {
        "_id": 1,
        "name": "Bank App",
        "image": "finance-image.jpg",
        "company": "Da Bank",
        "industry": "Finance",
        "rating": 2.0,
        "rating_count": 2,
        "developer": "WeDevelop",
        "note": "This banking app is doing bad",
        "app_store_url": "https://apps.apple.com/us/app/...",
        "website_url": "https://thebankapp.com"

    }, 
    {
        "_id": 2,
        "name": "Business App",
        "image": "business-image.jpg",
        "company": "Busy Business",
        "industry": "Consulting",
        "rating": 2.5,
        "rating_count": 34,
        "developer": "Busy Bees Develop",
        "note": "Users complain about old UI",
        "app_store_url": "https://apps.apple.com/us/app/...",
        "website_url": "https://thebusinessapp.com"

    }, 
    {
        "_id": 3,
        "name": "Car App",
        "image": "car-image.jpg",
        "company": "Vroom Vrrom",
        "industry": "Automotive",
        "rating": 1.5,
        "rating_count": 47,
        "developer": "Car Code Guys",
        "note": "The app crashes when I click something",
        "app_store_url": "https://apps.apple.com/us/app/...",
        "website_url": "https://thecarapp.com"

    },
    {
        "_id": 4,
        "name": "Food App",
        "image": "restraunt-image.jpg",
        "company": "The Dining Gals",
        "industry": "Food",
        "rating": 4.0,
        "rating_count": 87,
        "developer": "Bytes",
        "note": "This app is doing everything right",
        "app_store_url": "https://apps.apple.com/us/app/...",
        "website_url": "https://thefoodapp.com"

    },
    {
        "_id": 5,
        "name": "Fitness App",
        "image": "fitness-image.jpg",
        "company": "Strong Folk",
        "industry": "Fitness",
        "rating": 3.5,
        "rating_count": "42",
        "developer": "Foundational Code",
        "note": "I like how it keeps track of my calories, but  the timer needs work",
        "app_store_url": "https://apps.apple.com/us/app/...",
        "website_url": "https://thefitnessapp.com"

    },
    {
        "_id": 6,
        "name": "Logistics App",
        "image": "logistics-image.jpg",
        "company": "Major Trucking",
        "industry": "Logistics",
        "rating": 2.0,
        "rating_count": 236,
        "developer": "Rotten Apple",
        "note": "App looks very old could use a overhaul",
        "app_store_url": "https://apps.apple.com/us/app/...",
        "website_url": "https://thelogisticsapp.com"

    },
    {
        "_id": 7,
        "name": "Shopping App",
        "image": "shopbag-image.jpg",
        "company": "Shoppy Stuff",
        "industry": "Retail",
        "rating": 2.5,
        "rating_count": 89,
        "developer": "Broken Windows",
        "note": "Doesn't save my information properly",
        "app_store_url": "https://apps.apple.com/us/app/...",
        "website_url": "https://theshoppingsapp.com"

    },
    {
        "_id": 8,
        "name": "Travel App",
        "image": "travel-image.jpg",
        "company": "Coast 2 Coast",
        "industry": "Travel",
        "rating": 3.0,
        "rating_count": 420,
        "developer": "Niquidita",
        "note": "The app doesn't send proper notifications",
        "app_store_url": "https://apps.apple.com/us/app/...",
        "website_url": "https://thetravelingapp.com"

    }
]

app.get("/api/apps/", (req, res) => {
    console.log("in get request");
    res.send(apps);

});

//  To get a Single App
app.get("/api/houses/:id", (req, res)=>{
    const app = apps.find((app)=>app._id === parseInt(req.params.id));
    res.send(app);
});

app.listen(3001, () => {
    console.log("Server is up and running");

});

