export const customerAuth = async (req, _, next) => {
	try {
		req.type = "customer";
		next();
	} catch (error) {
		console.log(error);
		res
			.status(500)
			.json({ message: "Internal server error", dev: "type-middleware" });
	}
};

export const businessAuth = async (req, _, next) => {
  try {
    req.type = "business";
    next();
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Internal server error", dev: "type-middleware" });
  }
}