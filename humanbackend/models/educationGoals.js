const mongoose = require('mongoose');

const educationGoalSchema = new mongoose.Schema({
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    educationGoals: {
        type: String,
        required: true,
    },
    response: [{
        message: {
            type: Object,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        }
    }],
 
});

const EducationGoal = mongoose.model('EducationGoal', educationGoalSchema);

module.exports = EducationGoal;
