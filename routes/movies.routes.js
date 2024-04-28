
module.exports = app =>{
    let router = require("express").Router();
    const movies = require("../Controller/movies.controller.js")
    
    app.use("/movie", router);

    //Get
    router.get("/all", movies.findAll);
    //Find 
    router.get("/:id", movies.findOne)
    //Create 
    router.post("/", movies.create);

    // Update 
    router.put("/:id", movies.update);
    //Delelete
    router.delete("/delete", movies.deleteAll);
    router.delete("/delete/:id", movies.delete);

}