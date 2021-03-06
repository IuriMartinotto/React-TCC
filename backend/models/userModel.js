import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    senha: { type: String, required: true },
    ehAdmin: { type: Boolean, default: false, required: true }
}, {
    timestamps: true,
});

const User = mongoose.model("User", userSchema);

export default User;