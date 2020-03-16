"use strict";
import { Model, Schema, Document, Types, model } from "mongoose";
import { CONSTANT } from "../../constant";
export interface IUser extends Document {
    fullName: string;
    email: string;
    isEmailVerified: boolean
}

let userSchema = new Schema({
    _id: { type: Types.ObjectId, required: true, auto: true },
    fullName: { type: String, require: true },
    email: { type: String },
    isEmailVerified: { type: Boolean, default: false },
}, {
    versionKey: false,
    timestamps: true
});

userSchema.set("toObject", {
    virtuals: true
});

// Export user
export const User: Model<IUser> = model<IUser>(CONSTANT.MODEL.USER, userSchema);