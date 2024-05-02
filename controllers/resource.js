const Resource = require("../models/Resource");

// Resource Controller methods
exports.getCreateResource = (req, res) => {
  res.render("create_resource");
};

exports.createResource = async (req, res) => {
  try {
    // Extract necessary data from the request body
    const { title, description, link } = req.body;
    const createdBy = req.user._id; // Assuming you have user authentication and userId is available in the request

    // Create a new resource object
    const newResource = new Resource({
      title,
      description,
      link,
      createdBy,
    });

    // Save the new resource to the database
    await newResource.save();

    // Redirect the user to the newly created resource page or any other appropriate page
    res.redirect("/resources");
  } catch (err) {
    // If an error occurs, log the error and render an error page
    console.error(err);
    res.render("error", { error: err });
  }
};

exports.getResources = async (req, res) => {
  try {
    // Fetch resources from the database
    const resources = await Resource.find();

    // Render the resources view and pass the resources data to it
    res.render("resources", { resources });
  } catch (err) {
    // If an error occurs, log the error and render an error page
    console.error(err);
    res.render("error", { error: err });
  }
};
