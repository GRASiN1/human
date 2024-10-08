const HealthGoal = require("../models/healthGoals");
const { submitQuery, createChatSession } = require("../utils/apicalls");

const createHealthGoal = async (req, res) => {
    const { goal } = req.body; // Assuming createdBy is tied to req.user

    try {
        // Step 1: Create and save the health goal
        const newHealthGoal = new HealthGoal({
            createdBy: req.user._id, // Ensure req.user is set up correctly with authentication middleware
            healthGoals:goal,
        });

        const savedHealthGoal = await newHealthGoal.save();

        // Step 2: Call an external API with the health goal as input
        const id = await createChatSession(
            "gjQtC3H6EJTT09DcQeHZfCl0Mu4HjGin",
            "abc"
          );
        const response = await submitQuery(id, goal); // Await the API response

        // Step 3: Save the API response in the "response" array of the saved document
        const updatedHealthGoal = await HealthGoal.findByIdAndUpdate(
            savedHealthGoal._id, // Find the saved goal by its ID
            {
                $push: {
                  response: response, // Directly pushing the API response into the array
                }
              },
            { new: true } // Return the updated document after update
        );

        // Step 4: Send the updated health goal back to the client
        res.status(201).json({
            msg: 'Health goal created and API response saved successfully',
            status: 'T',
            data: updatedHealthGoal,
            
        });

    } catch (error) {
        console.error('Error creating health goal or calling API:', error.message);

        // Handle errors
        res.status(500).json({
            msg: 'An error occurred',
            status: 'F',
            data: error.message,
        });
    }
};

module.exports = {
    createHealthGoal,
};
