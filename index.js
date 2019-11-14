'use strict'

const hookManager = require('./hookmanager')

function openhook() {
    this.createHook = ({hookIdx}, defaultValue) => {
        let hook = hookManager.getHookState() || defaultValue
        const stateSetter = function (value) {
            hookManager.updateHookState(hookIdx, value)
            hook = value
        }
        return [hook, stateSetter]
    }
}

const OpenHook = new openhook()
module.exports = function hook(defaultValue) {
    let hookInfo = hookManager.hookWillRun()
    return OpenHook.createHook(hookInfo, defaultValue)
}