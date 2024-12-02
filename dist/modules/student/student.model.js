"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Student = void 0;
const mongoose_1 = require("mongoose");
const validator_1 = __importDefault(require("validator"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../app/config"));
// TODO: 2. Create schema
const userNameSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: [true, "First name is required"],
        trim: true,
        maxLength: [20, "Name can not be longer than 20"],
        validate: {
            validator: function (value) {
                console.log(value);
                const firstName = value.charAt(0).toUpperCase() + value.slice(1);
                if (value !== firstName) {
                    return false;
                }
                return true;
            },
            message: '{VALUE} is not capitalize format'
        }
    },
    middleName: { type: String, },
    lastName: {
        type: String,
        required: true,
        validate: {
            validator: (value) => validator_1.default.isAlpha(value),
            message: '{VALUE} is not alphanumeric'
        }
    }
});
const guardianSchema = new mongoose_1.Schema({
    fatherName: { type: String, required: true },
    fatherEmail: { type: String, required: true },
    fatherPhone: { type: String, required: true },
    fatherOccupation: { type: String, required: true },
    motherName: { type: String, required: true },
    motherEmail: { type: String, required: true },
    motherPhone: { type: String, required: true },
    motherOccupation: { type: String, required: true },
});
const localGuardianSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    occupation: { type: String, required: true },
    contactNo: { type: String, required: true },
    address: { type: String, required: true },
});
const studentSchema = new mongoose_1.Schema({
    id: { type: String, required: true, unique: true },
    password: { type: String, required: true, maxLength: [20, "Password length can not be longer than 20"], },
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
        required: [true, "Email is required"],
        unique: true,
        validate: {
            validator: (value) => validator_1.default.isEmail(value),
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
    isActive: {
        type: String,
        enum: ["active", "blocked"],
        default: "active",
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
studentSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        //console.log(this, 'pre hook : we will save data');
        //const user = this;
        // hashing password and save into DB
        this.password = yield bcrypt_1.default.hash(this.password, Number(config_1.default.bcrypt_salt_rounds));
        // user.password = await bcrypt.hash(user.password, Number(config.bcrypt_salt_rounds));
        next();
    });
});
// post save middleware or hook
studentSchema.post('save', function (doc, next) {
    doc.password = '';
    next();
    console.log(this, 'post hook : we saved our data');
});
// TODO: Query Middleware
studentSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
studentSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
studentSchema.pre('aggregate', function (next) {
    this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
    next();
});
// creating a custom static method
studentSchema.statics.isUserExist = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        const extingUser = yield exports.Student.findOne({ id });
        return extingUser;
    });
};
// creating a custom instance method
// studentSchema.methods.isUserExist = async function (id: string){
//     const extingUser = await Student.findOne({id})
//     return extingUser;
// }
// TODO: 3. Create model
exports.Student = (0, mongoose_1.model)('Student', studentSchema);
