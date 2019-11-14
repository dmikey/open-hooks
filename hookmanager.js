const hooks = {}
const context = {}
let hookQueue

const hookManager = {
    updateHookState: function(idx, value) {
        hooks[context.lastfn.id][idx].value = value
        hooks[context.lastfn.id].didUpdate = true
    },
    getHookState: function() {
        let state = (hooks[context.lastfn.id][context.lastHookIdx] 
            && hooks[context.lastfn.id][context.lastHookIdx].value)
            return state
    },
    hookWillRun: function() {
        let hookIdx = hookQueue.push(1) - 1
        hooks[context.lastfn.id][hookIdx] = hooks[context.lastfn.id][hookIdx] || {}
        context.lastHookIdx = hookIdx
        return {
            hookIdx,
            fnId: context.lastfn.id
        }
    },
    looperWillRun: function({id, fn}) {
        context.lastfn = {id, fn}
        hookQueue = []
        // check to see if hooks already exist
        const localHooks = hooks[id];
        if(!localHooks) {
            // no local hooks create space
            hooks[id] = []
        }
    },
    looperDidRun: function() {
        hookQueue = []
        if(hooks[context.lastfn.id].didUpdate) {
            hooks[context.lastfn.id].didUpdate = false
            hookManager.looperWillRun(context.lastfn)
            context.lastfn.fn()
            hookManager.looperDidRun()
        }
    }
}

module.exports = hookManager