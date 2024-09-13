const mongoose = require('mongoose');

const financeGoalSchema = new mongoose.Schema({
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    financeGoals: {
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

const FinanceGoal = mongoose.model('FinanceGoal', financeGoalSchema);

module.exports = FinanceGoal;
