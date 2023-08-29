const AllMessages = require('../Model/AllMessages');
const VerifiedUsers = require('../Model/VerifiedUsers');


const dragthreeMSG = async(user)=>{
    try{
        const messages = await AllMessages.find({senderId : user}).sort({sendintime : -1}).lean().exec();
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
            

            return filteredMessages;


        }else{
            return null
        }
    }catch(err){
        throw err
    }
}

module.exports = {
    dragthreeMSG
}