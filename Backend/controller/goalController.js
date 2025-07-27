const asyncHandler = require('express-async-handler');
const Goal = require('../models/goalModel');
const User = require('../models/userModel');

//@desc Get Goals
//@route GET /api/goals
//@access Private
const getGoals = asyncHandler(async (req, res) => {
	const goals = await Goal.find({ user: req.user.id });

	res.status(200).json(goals);
});

//@desc set Goals
//@route POST /api/goals
//@access Private
const SetGoal = asyncHandler(async (req, res) => {
	if (!req.body) {
		res.status(400);
		throw new Error('Please add a text field');
	}
	const goal = await Goal.create({
		text: req.body.text,
		user: req.user.id,
	});
	res.status(200).json(goal);
});

//@desc Update Goals
//@route PUT /api/goals/:id
//@access Private
const updateGoal = asyncHandler(async (req, res) => {
	const goal = await Goal.findById(req.params.id);

	if (!goal) {
		res.status(400);
		throw new Error('Goal not found');
	}

	const user = await User.findById(req.user.id);

	if (!user) {
		res.status(401);
		throw new Error('User not found');
	}

	//Make sure the logged in user matches the goal user
	if (goal.user.tostring() !== user.id) {
		res.status(401);
		throw new Error('User not authorized');
	}

	const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
	});

	res.status(200).json(updatedGoal);
});

//@desc Delete Goals
//@route DELETE /api/goals
//@access Private
const deleteGoal = asyncHandler(async (req, res) => {
	const goal = await Goal.findById(req.params.id);
	if (!goal) {
		res.status(400);
		throw new Error('Goal not found');
	}
	await goal.remove(req.params.id);
	res.status(200).json({ id: req.params.id });
});

module.exports = {
	getGoals,
	SetGoal,
	updateGoal,
	deleteGoal,
};
