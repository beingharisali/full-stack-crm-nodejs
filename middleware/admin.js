const adminOnly = async (req, res, next) => {
	if (!req.user.role) {
		return res.status(401).json({
			success: false,
			msg: "Unauthorize access! Missing user role",
		});
	}
	if (req.user.role !== "admin") {
		return res.status(403).json({
			success: false,
			msg: "Unauthorize access! Only user can access",
		});
	}
	next();
};

module.exports = adminOnly;
console.log(object);
