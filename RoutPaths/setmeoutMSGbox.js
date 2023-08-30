const InOutMsgBox = require('../Model/InOutMsgBox');

async function setmeoutMSGbox(req, res, next){
    try{
        const {usersl} = req.params;
        const settingin = await InOutMsgBox.find({userId : usersl});
        if(settingin){
            await InOutMsgBox.findOneAndDelete({userId : usersl});
            const setIt = new InOutMsgBox({
                userId : usersl,
                status : 'Outside'
            })

            await setIt.save();
        }else{
            const setIt = new InOutMsgBox({
                userId : usersl,
                status : 'Outside'
            })

            await setIt.save();
        }

        return res.status(200).json({
            message : 'Done'
        })
    }catch(err){
        throw err
    }
}

module.exports = setmeoutMSGbox