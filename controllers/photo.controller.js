const Photo = require("../Model/Photo");
const Bookmark = require("../Model/Bookmark");

const photoController = {};


photoController.createPhoto = async (req, res) => {
    try {
        const { description, country } = req.body;
        const { userId } = req;

        if (!req.file) {
            throw new Error("Image is required");
        }

        const latitude = parseFloat(req.body.latitude);
        const longitude = parseFloat(req.body.longitude);

        if (isNaN(latitude) || isNaN(longitude)) {
            throw new Error("Invalid latitude or longitude");
        }

        const imagePath = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

        const photo = new Photo({
            author: userId,
            image: imagePath,
            description,
            location: {
                latitude,
                longitude
            },
            country,
        });

        await photo.save();

        res.status(200).json({ status: "success", photo });

    } catch (error) {
        res.status(400).json({ status: "fail", error: error.message });
    }
};




photoController.getPhoto = async (req, res) => {
    try {
        const { country } = req.query;
        let photos;

        if (country) {
            photos = await Photo.find({ country: { $regex: country, $options: "i" } });
        } else {
            photos = await Photo.find({}).populate("author");
        }

        // 이미지 경로 중복 제거
        photos = photos.map(photo => {
            if (photo.image.includes('http://localhost:5001/http://localhost:5001/')) {
                photo.image = photo.image.replace('http://localhost:5001/http://localhost:5001/', 'http://localhost:5001/');
            }
            return photo;
        });

        res.status(200).json({ status: "success", data: photos });
    } catch (error) {
        res.status(400).json({ status: "fail", error: error.message });
    }
};



photoController.updatePhoto = async (req, res) => {
    try {
        const photoId = req.params.id;
        const { image, description, location, country } = req.body;

        const photo = await Photo.findByIdAndUpdate({ _id: photoId }, { image, description, location, country }, { new: true })
        if (!photo) throw new Error("photo doesn't exist")
        res.status(200).json({ Status: "success", data: photo })
    } catch (error) {
        res.status(400).json({ status: "fail", error: error.message });
    }
}

photoController.deletePhoto = async (req, res) => {
    try {
        const photoId = req.params.id;
        const photo = await Photo.findByIdAndDelete(photoId);
        if (!photo) {
            throw new Error("Photo not found");
        }

        await Bookmark.deleteMany({ photoId: photoId });

        res.status(200).json({ status: "success", message: "Photo deleted successfully" });
    } catch (error) {
        res.status(400).json({ status: "fail", error: error.message });
    }
};


module.exports = photoController;
