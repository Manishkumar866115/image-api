# image-api
A simple image api with get and post images features . Posting will upload the image and keep it in photos/uploads folder and insert it into our mongodb database. Get feature will 
fetch the information about the images from our database. Get is implemented along with offset and limit and it returns the array of images . the photos/uploads folder is used for
the static serving of the file . If the url of the image is clicked, it will show the uploaded images . The get also displays the url for next and previous page . 

The entering file is index.js . All the routes are kept in routes.js folder . Model ( Schema ) of image is in model/image.js .

A few test case screenshots are placed in the folder search api ss . The sample images to test are available in photos/sample .
