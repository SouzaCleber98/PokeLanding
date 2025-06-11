export default (req, res, next) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: "ID parameter is required" });
    }

    if (parseInt(id) !== req.userId) {
        return res.status(403).json({ message: "Acess Denied" });
    }

    next();
}
