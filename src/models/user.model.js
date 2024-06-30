import { Schema, model } from 'mongoose';
import {STATUS} from '../constants/constants.js'
export const userEducationSchema = new Schema({

    userId:{
        type:Schema.Types.ObjectId,
        ref: 'users'
    },
    schoolName: {
        type: Schema.Types.String,
        required: false,
    },
    degree: {
        type: Schema.Types.String,
        required: false,
    },
    fieldOfStudy: {
        type: Schema.Types.String,
        required: false,
    },
    startDate: {
        type: Schema.Types.Date,
        required: false,
    },
    endDate: {
        type: Schema.Types.Date,
        required: false
    }

},
);



export const userSchema = new Schema({

    firstName: {
        type: Schema.Types.String,
        required: true,
    },
    lastName: {
        type: Schema.Types.String,
        required: true,
    },
    email: {
        type: Schema.Types.String,
        required: true,
        unique: true
    },
    mobileNumber:{
        type: Schema.Types.Number,
        required: true,
    },
    password: {
        type: Schema.Types.String,
        required: true
    },
    about: {
        type: Schema.Types.String,
        required: false
    },
    profilePicture: {
        type: Schema.Types.Buffer,
        required: false,
        default: ""
    },
    connectionCount: {
        type:Schema.Types.Number,
        required:false
    },
    skills:{
        type: Schema.Types.Array,
        required: false
    },
    workingIn: {
        type: Schema.Types.String,
        required: false,
        default: ""
    },
    designation: {
        type: Schema.Types.String,
        required: false,
        default: ""
    },
    startDate: {
        type: Schema.Types.Date,
        required: false,
    },
    isVerified: {
        type: Schema.Types.Boolean,
        required: false,
        default: false
    },
    verificationToken: {
        type: Schema.Types.String,
        required: false,
        default: ""
    },
    forgetPasswordToken: {
        type: Schema.Types.String,
        required: false,
        default: ""
    },
    isProfileComplete: {
        type: Schema.Types.Boolean,
        required: true,
        default: false
    },
    status: {
        type: Schema.Types.String,
        required: true,
        enum: [STATUS.ACTIVE, STATUS.DELETED],
        default: STATUS.ACTIVE
    },
    created: {
        type: Schema.Types.Number,
        required: true,
        default: Date.now
    }
},{
    timestamps: true
})

userSchema.set('timestamps', true);

userSchema.index({username:1})
userSchema.index({firstName:1})
userSchema.index({lastName:1})
userSchema.index({email:1})
userSchema.index({mobileNumber:1})
userSchema.index({skills:1})
userEducationSchema.index({degree:1})
userEducationSchema.index({fieldOfStudy:1})


export const EducationModel = model('educations', userEducationSchema);
export const UserModel = model('users', userSchema);