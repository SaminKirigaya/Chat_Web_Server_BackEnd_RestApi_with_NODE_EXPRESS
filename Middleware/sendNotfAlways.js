const Notifications = require('../Model/Notifications');
const AllMessages = require('../Model/AllMessages');

const sendNotfAlways = async (sender, recver, username, image)=>{
    try{
        const AlreadyUnseen = await Notifications.findOne({$and : [{senderID : sender},{recverID : recver}]});
        if(!AlreadyUnseen){

            
          
            
                    const sendIt = new Notifications({
                        senderID : sender,
                        recverID : recver,
                        username : username,
                        image : image,
                        alert : `${username} messaged you while you were AFK or Busy ... He might be sad ... 😣😣😣`
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
    sendNotfAlways
};