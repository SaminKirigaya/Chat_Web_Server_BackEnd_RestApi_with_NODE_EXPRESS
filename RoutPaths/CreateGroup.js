const GroupDetails = require ('../Model/GroupDetails');
const Joi = require('joi');

const schema = Joi.object({
    groupname : Joi.string().pattern(/^([a-zA-Z0-9\-_'";,:!@ ]+)$/).required(),
    purpose : Joi.string().pattern(/^([a-zA-Z0-9\-_'";,:!@ ]+)$/).required(),
    country : Joi.string().pattern(/^([a-zA-Z ]+)$/).required()
})

async function CreateGroup (req, res, next){
    try{
        const {error} = schema.validate(req.body);
        if(error){
            return res.status(200).json({
                message : 'Make Sure To Input All Form Data & Follow Input Regulations ...'
            })
        }

        const {usersl} = req.params;
        const groupname = req.body.groupname;
        const purpose = req.body.purpose;
        const country = req.body.country;

        const alreadyExist = await GroupDetails.findOne({groupname : groupname});
        if(alreadyExist){
            return res.status(200).json({
                message : 'The Group Name Already Exists ...'
            })
        }else{
            const newGroup = new GroupDetails({
                adminSl : usersl,
                groupname : groupname,
                country : country,
                purpose : purpose
            })

            await newGroup.save()
                        .then(result=>{
                            return res.status(200).json({
                                message : 'Successfully Created The Group And Set You Admin ...'
                            })
                        })
                        .catch(err=>{
                            throw err
                        })
        }


    }catch(err){
        throw err
    }
}

module.exports = CreateGroup