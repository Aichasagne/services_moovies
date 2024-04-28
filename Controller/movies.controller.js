const db = require("../models")
const Movie = db.movies

//create ans save a new movie
exports.create = (req, res) => {
    if (!req.body.title) {
        res.status(400).send({message: "Title of the movie cannot be emty !"})
        return;
    }

    //Creation
    const movie = new Movie({
        title: req.body.title,
        release: req.body.release,
        author: req.body.author,
    });

    //Save
    movie
    .save(movie)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the movie.",
        });
      })
}

exports.findOne = (req, res) => {
    const id = req.params.id;
    Movie.findOne(id)
    .then(data =>{
    if (!data){
    res.status(404).send({ message: "movie Not found with id " + id });
    }
    else res.send(data);
    })
    .catch(err => {
        res.status(500).send({ message: "Error retrieving movie with id=" + id });
    })

}

// Retrieve all movies from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    let condition = title
      ? { title: { $regex: new RegExp(title), $options: "i" } }
      : {};
    Movie.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving movie.",
        });
      });
};

// Update a movie by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!",
      });
    }
    const id = req.params.id;
    Movie.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update movie with id=${id}. Maybe movie was not found!`,
          });
        } else res.send({ message: "movie was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating movie with id=" + id,
        });
      });
};
// Delete a Movie with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Movie.findByIdAndDelete(id)
    .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Movie with id=${id}. Maybe Movie was not found!`,
          });
        } else {
        res.send({
        message: "Movie was deleted successfully!",
    });
    }
    })
  .catch(err => {
    res.status(500).send({
    message: "Could not delete Movie with id=" + id,
    });
    });
};
  
  // Delete all movie from the database.
exports.deleteAll = (req, res) => {
    Movie.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} movie were deleted successfully!`,
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all movie.",
        });
      });
};