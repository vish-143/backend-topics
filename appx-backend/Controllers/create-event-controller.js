const createErrors = require("http-errors")
const Register = require("../Models/createEvent")

module.exports = {
    createEventRegistration:
     (req, res, next) => {
        console.log(req.body);
        const register = new Register({
            title: req.body.title,
            participant: req.body.participant,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            time:req.body.time,
            description:req.body.description
        })
        register.save()
            .then((result) => {
                console.log(result);
                res.send(result)
            })
            .catch((error) => {
                if (error.name === "ValidationError") {
                    next(createErrors(422, error.message))
                    return
                }
                next(error)
            })
    },
    
    geteventDetails: async (req, res, next) => {
        try {
            const result = await Register.find({}, { __v: 0 })
            res.send(result)
        } catch (error) {
            if (error.message.indexOf("Cast to ObjectId failed") !== -1) {
                next(createErrors.BadRequest("User not exists"));
            }
        }
    }
}