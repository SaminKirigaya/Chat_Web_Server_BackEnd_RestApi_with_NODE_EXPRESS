const AllMessages = require('../Model/AllMessages');

var SaveMessages = async (sender, recver, msg, img, senderusername, senderavatar, sendingtime )=>{
    try{
        const saveData = new AllMessages({
            senderId : sender,
            recverId : recver,
            sendingtime : sendingtime,
            senderAvatar : senderavatar,
            username : senderusername,
            message : msg,
            image : img
        });

        await saveData.save()
                    .then(success=>{
                        console.log('success')
                    })
                    .catch(err=>{
                        throw err
                    })

                    
    }catch(err){
        throw err
    }


}

module.exports = {
    SaveMessages
};