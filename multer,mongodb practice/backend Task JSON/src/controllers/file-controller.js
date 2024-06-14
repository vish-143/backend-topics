const fs = require("fs")
const path = require('path');
const multer = require('multer');
const FileSystem = require("../models/file-model")

//upload file to backend
const checkFileExist = (req, res, next) => {
    let fileLength = fs.readdirSync('uploads')
    if (fileLength.length !== 0) {
        return res.status(400).json({
            message: 'Already file exist!'
        })
    }
    return next()
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },

    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
})

const upload = multer({
    storage: storage,

    fileFilter: (req, file, cb) => {
        if (file.mimetype === "application/json") {
            cb(null, true);
        } else {
            return cb(new Error('Invalid file format. Only JSON files are allowed.'));
        }
    }
})

const uploadFile = upload.single('file');

//save file to mongodb
const saveFile = (req, res) => {
    let fileLength = fs.readdirSync('uploads')
    if (fileLength.length === 0) {
        return res.status(400).json({
            message: 'Please upload file!'
        })
    }
    else {
        fs.readdir("uploads", function (err, files) {
            if (err) {
                return res.status(400).json({
                    message: 'Directory is not present', err
                })
            }
            else {
                files.forEach(async (file) => {
                    const filepath = path.join("uploads", file)
                    const collection = JSON.parse(fs.readFileSync(filepath, "utf-8"))
                    try {
                        const count = await FileSystem.countDocuments()
                        if (count > 0) {
                            return res.status(400).json({
                                message: "Already file added to database"
                            })
                        }
                        else {
                            const result = await FileSystem.insertMany(collection)
                            return res.status(200).json({
                                data: result,
                                message: "File added to database successfully"
                            })
                        }
                    } catch (error) {
                        return res.status(400).json({
                            message: 'Error while storing file', error
                        })
                    }
                })
            }
        })
    }
}

//get file
const getFile = async (req, res) => {
    try {
        const result = await FileSystem.find({}, { __v: 0 }).limit(10).sort({ "name": -1 })
        if (result.length > 0) {
            return res.status(200).json({
                data: result,
                message: "Fetched the file details successfully"
            })
        } else {
            return res.status(400).json({
                data: result,
                message: 'No data is present in the database'
            })
        }
    } catch (error) {
        return res.status(400).json({
            message: 'Error while fetching file', error
        })
    }
}

//add year field
const addYear = async (req, res) => {
    try {
        const documents = await FileSystem.find({});
        documents.forEach(async (document) => {
            const randomYear = String(Math.floor(Math.random() * (2015 - 2000 + 1) + 2000));
            await FileSystem.updateOne({ _id: document._id }, { $set: { establishedYear: randomYear } })
        });
        return res.status(200).json({
            message: "Established Year added to every document in the database"
        });
    } catch (error) {
        return res.status(400).json({
            message: 'Error while adding year field', error
        });
    }
}

//add nested food items
const addFoodItems = async (req, res) => {
    const morningVeg = ["Idly", "Pongal", "Vada", "Poori", "Omlette", "Dosa"]
    const nightVeg = ["Chapathi", "Chicken Rice", "Parotta", "Ghee Dosa", "Idiyappam", "Biryani"]
    const morningNonVeg = ["Goat Soup", "Chicken Biryani", "Mutton Kheema", "Beef", "Chicken Fry", "Mutton Tandoori"]
    const nightNonVeg = ["Grill", "Pepper Chicken Dosa", "Tawa Biryani", "Spicy Shezwaan Rice", "Chicken Pizza", "Fish Fry"]

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        const selectedElements = array.slice(0, 3);
        return selectedElements
    }

    try {
        const findId = await FileSystem.find({})
        findId.forEach(async (documents) => {
            await FileSystem.updateOne({ _id: documents._id },
                {
                    $set: {
                        foodItems: {
                            veg: [
                                {
                                    morning: shuffleArray(morningVeg)
                                },
                                {
                                    evening: shuffleArray(nightVeg)
                                }],
                            nonveg: [
                                {
                                    morning: shuffleArray(morningNonVeg)
                                },
                                {
                                    evening: shuffleArray(nightNonVeg)
                                }]
                        }
                    }
                }
            )
        })
        return res.status(200).json({
            message: "Food items added to every document in the database"
        });
    } catch (error) {
        return res.status(400).json({
            message: 'Error while adding food items field', error
        });
    }
}

//add dosa to array if not exists
const addDosa = async (req, res) => {
    try {
        await FileSystem.updateMany(
            {},
            { $addToSet: { 'foodItems.veg.0.morning': "Dosa" } }
        );

        // const documents = await FileSystem.find({});
        // for (const document of documents) {
        //     if (document.foodItems && document.foodItems.veg) {
        //         await FileSystem.update(
        //             {},
        //             // { _id: document._id, 'foodItems.veg.morning': { $ne: "Dosa" } },
        //             { $addToSet: { 'foodItems.veg[$item].morning': "Dosa" } },
        //             // { arrayFilters: [{ 'item.morning': { $ne: "Dosa" } }] }
        //         );
        //     }
        // }
        return res.status(200).json({
            message: "Dosa added to morning array successfully"
        });

    } catch (error) {
        return res.status(400).json({
            message: 'Error while adding dosa ', error
        });
    }
}

//getScore if the range between 6-9
const getRangedScore = async (req, res) => {
    try {
        const result = await FileSystem.find({ grades: { $elemMatch: { score: { $gte: 6, $lte: 9 } } } })
        if (result.length > 0) {
            return res.status(200).json({
                data: result,
                message: "Fetched the score between 6-9 successfully"
            })
        } else {
            return res.status(400).json({
                data: result,
                message: 'No data is present in the database'
            })
        }
    } catch (error) {
        return res.status(400).json({
            message: 'Error while getting Score ', error
        });
    }
}

module.exports = {
    checkFileExist,
    uploadFile,
    saveFile,
    getFile,
    addYear,
    addFoodItems,
    addDosa,
    getRangedScore
}

