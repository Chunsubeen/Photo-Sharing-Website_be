const Bookmark = require("../Model/Bookmark");

const bookmarkController = {};

bookmarkController.addPhotoToBookmark = async (req, res) => {
    try {
        const { userId } = req;
        const { photoId } = req.body;

        const existingBookmark = await Bookmark.findOne({ userId, photoId });
        if (existingBookmark) {
            throw new Error("이미 북마크한 사진입니다.");
        }

        const newBookmark = new Bookmark({ userId, photoId });
        await newBookmark.save();

        res.status(200).json({ status: 'success', data: newBookmark });
    } catch (error) {
        return res.status(400).json({ status: 'fail', error: error.message });
    }
};


bookmarkController.getBookmark = async (req, res) => {
    try {
        const { userId } = req;
        const bookmarks = await Bookmark.find({ userId }).populate('photoId');
        res.status(200).json({ status: "success", data: bookmarks });
    } catch (error) {
        return res.status(400).json({ status: 'fail', error: error.message });
    }
};



bookmarkController.deleteBookmark = async (req, res) => {
    try {
        const { userId } = req;
        const { bookmarkId } = req.params;


        const bookmark = await Bookmark.findOneAndDelete({ _id: bookmarkId, userId });

        if (!bookmark) {
            return res.status(404).json({ status: "fail", message: "북마크를 찾을 수 없습니다." });
        }

        res.status(200).json({ status: "success", message: "북마크가 삭제되었습니다." });
    } catch (error) {
        return res.status(500).json({ status: 'fail', error: error.message });
    }
};

module.exports = bookmarkController;
