const express = require("express")
const router = express.Router()
const FileController = require("../controllers/file-controller")

// router.post("/post", FileController.checkFileExist,FileController.upload.single('file'), FileController.uploadFile);
router.post("/post", FileController.checkFileExist, function (req, res) {
    FileController.uploadFile(req, res, function (err) {
        console.log('req: ', typeof req.body.file);
        if (err) {
            return res.status(400).send({ message: err.message })
        }
        try {
            if (req.body.file === "null") {
                console.log("Null value")
                return res.status(400).send({ message: "Please Choose File to upload" })
            }
            else {
                console.log("Not Null value")
                const file = req.file;
                return res.status(200).send({
                    filename: file.filename,
                    mimetype: file.mimetype,
                    originalname: file.originalname,
                    size: file.size,
                    fieldname: file.fieldname
                })
            }
        } catch (error) {
            console.log('error: ', error);
        }
    })
})

router.post("/save", FileController.saveFile)
router.get("/", FileController.getFile)
router.get("/score-range", FileController.getRangedScore)
router.patch("/add-year", FileController.addYear)
router.patch("/add-food-items", FileController.addFoodItems)
router.patch("/add-dosa", FileController.addDosa)

module.exports = router   