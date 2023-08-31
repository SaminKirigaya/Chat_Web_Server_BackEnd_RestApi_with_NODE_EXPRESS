const AllMessages = require('../Model/AllMessages');

var SaveMessages = async (sender, recver, msg, img, senderusername, senderavatar, sendingtime )=>{
    try{
        
        var charactersToReplace = ['<', '>', '/', ';'];
        var replacementCharacters = ['&lt;', '&gt;', '&#47;', '&#59;'];
      
        for (let i = 0; i < charactersToReplace.length; i++) {
            const regex = new RegExp(charactersToReplace[i], 'g');
             msg = msg.replace(regex, replacementCharacters[i]);
            
        }

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