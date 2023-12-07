class Events {
    _callbacks = [];
    _nextId = 0;

    emit(eventName, value) {
        this._callbacks.forEach(callback => {
            if(callback.eventName === eventName) {
                callback.callback(value);
            }
        });
    }

    on(eventName, caller, callback) {
        this.nextId++;
        this._callbacks.push({
            id: this._nextId,
            eventName,
            caller,
            callback
        });

        return this._nextId;
    }

    off(id) {
        this._callbacks = this._callbacks.filter(callback => callback.id !== id);
    }

    unsubscribe(caller) {
        this._callbacks = this._callbacks.filter(callback => callback.caller !== caller);
    } 
}

export const events = new Events();