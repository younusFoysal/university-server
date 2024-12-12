import { Schema, model } from "mongoose";
import {TGuardian, TLocalGuardian, TStudent, StudentModel, TUserName} from "./student.interface";
import validator from 'validator';
import bcrypt from "bcrypt";
import config from "../../app/config";


// TODO: 2. Create schema
const userNameSchema = new Schema<TUserName, StudentModel>({
    firstName: {
        type: String,
        required: [true, "First name is required"],
        trim: true,
        maxLength: [20, "Name can not be longer than 20"],
        // validate: {
        //     validator: function (value: string) {
        //         //console.log(value);
        //         const firstName: string = value.charAt(0).toUpperCase() + value.slice(1);
        //         if ( value !== firstName){
        //             return false;
        //         }
        //         return true;
        //
        //     },
        //     message: '{VALUE} is not capitalize format'
        // }
    },
    middleName: { type: String,},
    lastName: {
        type: String,
        required: true,
        // validate: {
        //     validator: (value: string) => validator.isAlpha(value),
        //     message: '{VALUE} is not alphanumeric'
        // }
    }
});

const guardianSchema = new Schema<TGuardian>({
    fatherName: { type: String, required: true },
    fatherEmail: { type: String, required: true },
    fatherPhone: { type: String, required: true },
    fatherOccupation: { type: String, required: true },
    motherName: { type: String, required: true },
    motherEmail: { type: String, required: true },
    motherPhone: { type: String, required: true },
    motherOccupation: { type: String, required: true },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
    name: { type: String, required: true },
    occupation: { type: String, required: true },
    contactNo: { type: String, required: true },
    address: { type: String, required: true },
});

const studentSchema = new Schema<TStudent, StudentModel>({
    id: {type: String , required: true, unique: true},
    user: {
        type: Schema.Types.ObjectId,
        required: [true, 'User ID is required'],
        unique: true,
        ref: "User",
    },
    name: {
        type: userNameSchema,
        required: true,
    },
    gender: {
        type: String,
        enum: {
            values: ["male", "female", "other"],
            message: "The {VALUE} is invalid."
        },
        required: true
    },
    dateOfBirth: String,
    email: {
        type: String,
        required: [true, "Email is required"] ,
        unique: true,
        validate: {
            validator: (value: string) => validator.isEmail(value),
            message: '{VALUE} is not a valid email'
        }
    },
    contactNo: { type: String, required: true },
    emergencyContactNo: { type: String, required: true },
    bloodGroup: {
        type: String,
        enum: ["A+", "A-", "AB-", "B-", "O-"],
    },
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    guardian: {
        type: guardianSchema,
        required: true,
    },
    localGuardian: {
        type: localGuardianSchema,
        required: true,
    },
    profileImg: { type: String },
    admissionSemester: {
        type: Schema.Types.ObjectId,
        ref: "AcademicSemester"
    },
    isDeleted: {
        type: Boolean,
        default: false,
    }
}, {
    toJSON: { virtuals: true },
});

// TODO: virtual
studentSchema.virtual('fullName').get(function () {
    return this.name.firstName + " " + this.name.middleName + " " + this.name.lastName;
});

// pre save middleware or hook : will work on create() save()
// studentSchema.pre('save', async function (next){
//     //console.log(this, 'pre hook : we will save data');
//     //const user = this;
//     // hashing password and save into DB
//     this.password = await bcrypt.hash(this.password, Number(config.bcrypt_salt_rounds));
//     // user.password = await bcrypt.hash(user.password, Number(config.bcrypt_salt_rounds));
//
//     next();
// });

// post save middleware or hook
// studentSchema.post('save', function (doc, next){
//
//     doc.password='';
//     next();
//     console.log(this, 'post hook : we saved our data');
// });


// TODO: Query Middleware
studentSchema.pre('find', function (next){
    this.find({isDeleted: {$ne: true}});
    next();
});
studentSchema.pre('findOne', function (next){
    this.find({isDeleted: {$ne: true}});
    next();
});
studentSchema.pre('aggregate', function (next){
    this.pipeline().unshift({$match: {isDeleted: {$ne: true}}});
    next();
});




// creating a custom static method
studentSchema.statics.isUserExist = async function (id: string){
    const existingUser  = await Student.findOne({id});
    return existingUser;
};




// creating a custom instance method
// studentSchema.methods.isUserExist = async function (id: string){
//     const extingUser = await Student.findOne({id})
//     return extingUser;
// }

// TODO: 3. Create model
export const Student = model<TStudent, StudentModel>('Student', studentSchema);

