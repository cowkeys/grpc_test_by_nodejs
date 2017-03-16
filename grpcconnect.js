var grpc = require('grpc');
var ryCli;
var accCli;
function initRyClient(){
    let ryProto = grpc.load('./proto/rycloud/rycloud.proto').rycloud;
    ryCli = new ryProto.RYCloudSrv('127.0.0.1:50005',grpc.credentials.createInsecure()); 
}
function initAccount() {
    let accProto = grpc.load('./proto/account/account.proto').account;
    accCli = new accProto.AccountSrv('127.0.0.1:50008',grpc.credentials.createInsecure());
   }

var outputRes = function(err,response){
     if (err){
            console.log("================error=============\n",err);
      }else{
            console.log("===============success============\n",response);
     }
      closeGrpc();
}

function closeGrpc(){
    if (typeof(ryCli) == "object"){
        grpc.getClientChannel(ryCli).close();
    }
    if (typeof(accCli) == "object"){
        grpc.getClientChannel(accCli).close();
    }
    console.log("============close-grpc==============\n");
}

/*******************Connect*************************/
exports.testRy = function testRy(params,api){
    initRyClient();
    ryCli[api].apply(ryCli, [params,outputRes]);
}

exports.testAcc = function testAcc(params,api){
    initAccount();
    accCli[api].apply(accCli,[params,outputRes]);
}

