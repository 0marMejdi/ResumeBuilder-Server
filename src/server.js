let express = require('express');
const config = require ("dotenv").config();
let authenticationRouter = require('./Routes/AuthenticationRoutes');
let templateRouter = require("./Routes/TemplateRoutes");
let projectRouter = require("./Routes/ProjectRoutes");
let userRouter=require("./Routes/UserRouters")
let badRoute = require("./Middlewares/PageNotFound")
let cors = require("cors")
let app = express();
const dbContext = require("./Models/ResumeBuilderDataBase");

app.use(express.json());


const PORT = 8000;
app.use(cors());
app.use(templateRouter);
app.use(authenticationRouter);
app.use(userRouter);
app.use(projectRouter);
app.use(badRoute);
app.listen(PORT, async() => {
    console.log("Connecting to database and checking tables");
    let res = await dbContext.createTables();
    console.log(res);
console.log(`Server is running on port ${PORT}.
http://localhost:${PORT}`);
});