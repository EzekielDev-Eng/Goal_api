const express = require('express');
const router = express.Router();
const {
	getGoals,
	SetGoal,
	updateGoal,
	deleteGoal,
} = require('../controller/goalController');

const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getGoals).post(protect, SetGoal);
router.route('/:id').delete(protect, deleteGoal).put(protect, updateGoal);

module.exports = router;
