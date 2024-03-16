
const getUserName = async (req, res, next) => {
    try {
        const userData = req.user;
        
        res.json({ username: userData.username });
    } catch (err) {
        res.status(500).json({ message: err.message || 'Failed to get user data' });
    }
};

exports.getUserName = getUserName;
