const AllMessages = require('../Model/AllMessages');
const VerifiedUsers = require('../Model/VerifiedUsers');


 async function ThreeGuys (req, res, next){
    try{
        const {usersl} = req.params;
        const messages = await AllMessages.find({senderId : usersl}).sort({sendintime : -1}).lean().exec();
        if(messages){


            const uniqueReceiverIDs = new Set();
            var filteredMessages = [];

            for (const message of messages) {
            if (!uniqueReceiverIDs.has(message.recverId)) {
                uniqueReceiverIDs.add(message.recverId);
                filteredMessages.push(message);
                
            }
            }

            await Promise.all(
                filteredMessages.map(async(each)=>{
                    const recverData = await VerifiedUsers.findById(each.recverId);
                    each.recvAvatar = recverData.image
                })  

            )
            


            return  res.status(200).json({
                message : 'success',
                lastguys : filteredMessages
            })


        }else{
            return  res.status(200).json({
                message : 'failed',
                
            })
        }
    }catch(err){
        throw err
    }
}

module.exports = ThreeGuys