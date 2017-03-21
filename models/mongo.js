var mongoose    =   require("mongoose");

mongoose.connect('mongodb://api:api321@mongodb3/sampledb',function(err) {
    if (err)
        return console.error(err);
});

// create instance of Schema
var mongoSchema =   mongoose.Schema;
// create schema
var userSchema  = {
    "userEmail" : String,
    "userPassword" : String
};
// create model if not exists.
module.exports = mongoose.model('userLogin',userSchema);