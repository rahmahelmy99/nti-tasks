const { argv } = require("yargs")
const yargs =require("yargs")
const customers=require("./utils/customers")
yargs.command({
    command:"addCustomer",
    builder:{
        name:{demandOption:true,describe:"customer name"},
        balance:{demandOption:true,describe:"customer balance"},
        transactions:{describe:"customer transactions"}
    },
    handler:(argv)=>customers.addCustomer(argv)
})
 
yargs.command({
    command:"addAccNum",
    builder:{id:{demandOption:true}},
    handler:(argv)=>customers.addAccNum(argv)
})

yargs.command({
    command:"showCustomer",
    builder:{id:{demandOption:true}},
    handler:(argv)=>customers.showCustomer(argv)
})

yargs.command({
    command:"showAll",
    handler:()=>customers.showAll()
})
yargs.command({
    command:"addTrans",
    builder:{
        id:{demandOption:true},
        transType:{demandOption:true},
        transDetails:{demandOption:true}
    },
    handler: (argv)=>customers.addTransaction(argv)
})

yargs.command({
    command:"deleteCustomer",
    builder:{id:{demandOption:true}},
    handler:(argv)=>customers.deleteCustomer(argv)
})

yargs.command({
    command:"deleteAll",
    handler:()=>customers.deleteAll()
})


yargs.argv