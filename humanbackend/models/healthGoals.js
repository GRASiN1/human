const mongoose = require('mongoose');

const healthGoalSchema = new mongoose.Schema({
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    healthGoals: {
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

const HealthGoal = mongoose.model('HealthGoal', healthGoalSchema);

module.exports = HealthGoal;
