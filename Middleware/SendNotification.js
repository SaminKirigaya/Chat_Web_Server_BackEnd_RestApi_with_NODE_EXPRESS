const Notifications = require('../Model/Notifications');

const SendNotification = async (sender, recver, username, image)=>{
    try{
        const AlreadyUnseen = await Notifications.findOne({$and : [{senderID : sender},{recverID : recver}]});
        if(!AlreadyUnseen){
            const sendIt = new Notifications({
                senderID : sender,
                recverID : recver,
                username : username,
                image : image,
                alert : `${username} messaged you while you were offline ... He might be sad so reply quicccccckkkkkkkkkkkk 😣😣😣`
            });
            await sendIt.save()

            return true

        }else{
            return false
        }
        
    }catch(err){
        throw err
    }
}

module.exports={
    SendNotification
};