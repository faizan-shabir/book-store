const cloudinary = require("cloudinary").v2;
const Book = require("../models/bookModel");

cloudinary.config({
    cloud_name: "dbo0xmbd7",
  api_key: "717735839128615",
  api_secret: "fqcjtd3HxpH_t1dAEtqr595ULW0",
})
U
const createBook = async (req , res) => {
    try{
        const { bookTitle,bookAuthor,bookDescription,bookPrice}= req.body;
        if(
            bookTitle !== "" &&
            bookAuthor !== "" &&
            bookDescription !== "" &&
            bookPrice !== "" 
        ) {
            const {image} = req.body
            console.log(image)

            if (!image) {
                return res.render("addBook", {message = "No Image Selected"});
            }

            const fileUpload = await cloudinary.uploader.upload(image, {
                folder: "Book_Delights",
            });

            
        }
    }
}