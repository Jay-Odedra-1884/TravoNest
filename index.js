    const express = require("express");
    const app = express();
    const listingRoute = require("./routes/listing")
    const reviewRoute = require("./routes/reviews");
    const userRoute = require("./routes/user");
    const adminRoute = require("./routes/admin");
    const paymentRoutes = require('./routes/payment');
    const mongoose = require("mongoose");
    const Path = require("path");
    const methodOverride = require("method-override");
    const engine = require("ejs-mate");
    const ExpressError = require("./utils/ExpressError");
    const session = require("express-session");
    const MongoStore = require('connect-mongo');
    const flash = require("connect-flash");
    const passport = require("passport");
    const LocalStrategy = require("passport-local");
    const User = require("./models/user");
const { error } = require("console");

    //?Database Url
    const DB_URL = process.env.MONGODBATLAS_DATABASE_URL

    const store = MongoStore.create({
        mongoUrl: DB_URL,
        crypto: {
            secret: process.env.SECRET,
        },
        touchAfter: 24 * 3600,
    });

    store.on("error", () => {
        console.log("Session store error : => ", err)

    })

    const sessionOptions = {
        store,
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: {
            expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
        }
    };

    app.use(session(sessionOptions));
    app.use(flash());

    //for passport (configuring statergy)
    app.use(passport.initialize());
    app.use(passport.session());
    passport.use(new LocalStrategy(User.authenticate()));

    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());

    app.use((req, res, next) => {
        res.locals.success = req.flash("success");
        res.locals.error = req.flash("error");
        res.locals.currUser = req.user;
        next();
    });

    //*main function to make a connection with database
    const main = async() => {
        await mongoose.connect(DB_URL);
    }

    //calling main function
    main()
    .then(() => {
        console.log("👉 Database connection successful 👍 ✅");
    })
    .catch((e) => {
        console.log("👉 Error : In DataBase connection 👎 ⛔");
    });

    app.engine('ejs', engine);
    app.set("view engine", "ejs");
    app.set("views", Path.join(__dirname, "views"));
    app.use(express.urlencoded({ extended: true }));
    app.use(methodOverride("_method"));
    app.use(express.static(Path.join(__dirname, "/public")));
    app.use(express.json());

    //*a Routes

    //landing route
    app.get("/", (req, res) => {
        res.redirect("/listing")
    });

    //*for Listing
    app.use("/listing", listingRoute);

    //*for Reviews
    app.use("/listing/:id/reviews", reviewRoute);


    //*for user
    app.use("/", userRoute);

    //*for admin
    app.use("/admin", adminRoute )

    //*For payment
    app.use('/payment', paymentRoutes);

    //*testing route


    // to catch all unmatch route
    // app.all("*", (req, res, next) => {
    //     console.log(req.url);
    //     next(new ExpressError(404, "OPPS! Page not found!"));
    // })

    app.use((err, req, res, next) => {
        let { statusCode = 500, message = "Something went wrong" } = err;
        res.status(statusCode).render("error.ejs", { message });
    });

    //!server port-------||
    app.listen(process.env.PORT, () => {
        console.log("Server startes at port : 8080 ");
    })