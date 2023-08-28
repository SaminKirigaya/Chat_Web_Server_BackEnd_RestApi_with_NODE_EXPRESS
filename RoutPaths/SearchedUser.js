const VerifiedUsers = require('../Model/VerifiedUsers');
const RequestSent = require('../Model/RequestSent');
const AcceptedReq = require('../Model/AcceptedReq');


async function checkRecverIDInModels(userslno,recverID) {
    const requestSentResult = await RequestSent.findOne({ $and: [{ senderID: userslno }, { recverID: recverID }] });
    const acceptedReqResult = await AcceptedReq.findOne({ $and: [{ senderID: userslno }, { recverID: recverID }] });

    if(requestSentResult){
        return false
    }else if (acceptedReqResult){
        return false
    }else{
        return true
    }
    
    
}

async function SearchedUser(req, res, next){
    try{
        const {person} = req.body;
        const {usersl} = req.params;
        const searchResults = await VerifiedUsers.find(
            { $text: { $search: person } },
            { score: { $meta: 'textScore' } }
          ).sort({ score: { $meta: 'textScore' } });

          if(searchResults){
            var filteredResults = searchResults.filter(result => result._id.toString() !== usersl);


            const finalResults = filteredResults.filter(result => {
                const recverID = result._id.toString();
                return checkRecverIDInModels(usersl, recverID);
            });
            
            if(finalResults){
               
                return res.status(200).json({
                    message : 'success',
                    person : finalResults
                })
            }else{
                return res.status(200).json({
                    message : 'failed',
                   
                })
            }
            
          }

    }catch(err){
        throw err
    }
}

module.exports = SearchedUser;