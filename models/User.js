const mongoose = require ('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
<<<<<<< HEAD
    googleId: String,
    credits: { type: Number, default: 0}
=======
    googleId: String
>>>>>>> 877cc49506ec737f85115dd80879d29fce4f8683
});

mongoose.model('users', userSchema);