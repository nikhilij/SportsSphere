const Club = require('../models/Club');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/error');

// Get all clubs
exports.getAllClubs = catchAsync(async (req, res, next) => {
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach(field => delete queryObj[field]);

    // Advanced filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
    
    let query = Club.find(JSON.parse(queryStr));

    // Sorting
    if (req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ');
        query = query.sort(sortBy);
    } else {
        query = query.sort('-createdAt');
    }

    // Field limiting
    if (req.query.fields) {
        const fields = req.query.fields.split(',').join(' ');
        query = query.select(fields);
    } else {
        query = query.select('-__v');
    }

    // Pagination
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 10;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);

    // Execute query
    const clubs = await query;

    res.status(200).json({
        status: 'success',
        results: clubs.length,
        data: {
            clubs
        }
    });
});

// Get a single club
exports.getClub = catchAsync(async (req, res, next) => {
    const club = await Club.findById(req.params.id);

    if (!club) {
        return next(new AppError('No club found with that ID', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            club
        }
    });
});

// Create a new club
exports.createClub = catchAsync(async (req, res, next) => {
    const newClub = await Club.create(req.body);

    res.status(201).json({
        status: 'success',
        data: {
            club: newClub
        }
    });
});

// Update a club
exports.updateClub = catchAsync(async (req, res, next) => {
    const club = await Club.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if (!club) {
        return next(new AppError('No club found with that ID', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            club
        }
    });
});

// Delete a club
exports.deleteClub = catchAsync(async (req, res, next) => {
    const club = await Club.findByIdAndDelete(req.params.id);

    if (!club) {
        return next(new AppError('No club found with that ID', 404));
    }

    res.status(204).json({
        status: 'success',
        data: null
    });
});

// Search clubs by name or sport
exports.searchClubs = catchAsync(async (req, res, next) => {
    const { query } = req.query;
    
    if (!query) {
        return next(new AppError('Please provide a search query', 400));
    }
    
    const clubs = await Club.find({
        $or: [
            { name: { $regex: query, $options: 'i' } },
            { sport: { $regex: query, $options: 'i' } }
        ]
    });
    
    res.status(200).json({
        status: 'success',
        results: clubs.length,
        data: {
            clubs
        }
    });
});

// Get popular clubs (by member count)
exports.getPopularClubs = catchAsync(async (req, res, next) => {
    const limit = req.query.limit * 1 || 5;
    
    const clubs = await Club.find()
        .sort('-memberCount')
        .limit(limit);
    
    res.status(200).json({
        status: 'success',
        results: clubs.length,
        data: {
            clubs
        }
    });
});

// Add a member to a club
exports.addMember = catchAsync(async (req, res, next) => {
    const club = await Club.findByIdAndUpdate(
        req.params.id,
        { $addToSet: { members: req.body.userId } },
        { new: true, runValidators: true }
    );

    if (!club) {
        return next(new AppError('No club found with that ID', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            club
        }
    });
});

// Remove a member from a club
exports.removeMember = catchAsync(async (req, res, next) => {
    const club = await Club.findByIdAndUpdate(
        req.params.id,
        { $pull: { members: req.body.userId } },
        { new: true }
    );

    if (!club) {
        return next(new AppError('No club found with that ID', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            club
        }
    });
});