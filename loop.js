const uuid = require('./utils').uuidv4
const fns = []
const hookmanager = require('./hookmanager')

function loop(fn) {
    return fns.push({
        id: uuid(),
        exec: fn
    })
}

loop.prototype.run = function () {
    fns.forEach(fn => {
        hookmanager.looperWillRun({id: fn.id, fn: fn.exec})
        fn.exec()
        hookmanager.looperDidRun()
    })
}

loop.prototype.iterations = function (times) {
    if(times) {
        for(let i=0; i < times; i++) {
            this.run()
        }
    }
}

// export a function ready to run
// module.exports = hookLoop(myHookedFunction)
// export()
module.exports = function(fn) {
    const loopFn = new loop(fn)
    return () =>{
        loopFn.run()
    }
}