const Notifications = require('../Model/Notifications');
const AllMessages = require('../Model/AllMessages');

const SendNotiIfChatOther = async (sender, recver, username, image)=>{
    try{
        const AlreadyUnseen = await Notifications.findOne({$and : [{senderID : sender},{recverID : recver}]});
        if(!AlreadyUnseen){

            const recverwithwhom = await AllMessages.findOne({senderId : recver}).sort({ sendingtime: -1 });
            if(recverwithwhom){
                console.log(recverwithwhom)
                if(recverwithwhom.recverId != sender){
                    const sendIt = new Notifications({
                        senderID : sender,
                        recverID : recver,
                        username : username,
                        image : image,
                        alert : `${username} messaged you while you were chatting other ... He might be sad ... 😣😣😣`
                    });
                    await sendIt.save()
        
                    return true
                }else{
                    return false
                }
            }else{
                return false
            }
            

        }else{
            return false
        }
        
    }catch(err){
        throw err
    }
}

module.exports={
    SendNotiIfChatOther
};