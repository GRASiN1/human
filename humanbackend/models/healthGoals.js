const mongoose = require('mongoose');

const healthGoalSchema = new mongoose.Schema({
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    healthGoals: {
        type: String,
        required: true,
    },
    response: [{
        type: Object, // Directly storing objects in the response array
        required: true,
      }],
   
});

const HealthGoal = mongoose.model('HealthGoal', healthGoalSchema);

module.exports = HealthGoal;
