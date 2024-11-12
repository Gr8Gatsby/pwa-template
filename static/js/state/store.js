// Simple state management system
class Store {
    constructor(initialState = {}) {
        this._state = initialState;
        this._subscribers = new Set();
        this._history = [];
    }

    // Get current state
    get state() {
        return { ...this._state };
    }

    // Subscribe to state changes
    subscribe(callback) {
        this._subscribers.add(callback);
        return () => this._subscribers.delete(callback);
    }

    // Update state
    dispatch(action) {
        const oldState = { ...this._state };
        const newState = this._reducer(oldState, action);
        
        this._history.push({
            action,
            timestamp: new Date(),
            previousState: oldState
        });
        
        this._state = newState;
        this._notifySubscribers();
    }

    // Private methods
    _reducer(state, action) {
        switch (action.type) {
            case 'UPDATE_THEME':
                return { ...state, theme: action.payload };
            case 'SET_USER_PREFERENCES':
                return { ...state, preferences: { ...state.preferences, ...action.payload } };
            case 'TOGGLE_NAVIGATION':
                return { ...state, isNavOpen: !state.isNavOpen };
            default:
                return state;
        }
    }

    _notifySubscribers() {
        this._subscribers.forEach(callback => callback(this.state));
    }

    // For debugging
    getHistory() {
        return [...this._history];
    }
}

// Create and export store instance
export const store = new Store({
    theme: 'light',
    preferences: {
        animations: true,
        fontSize: 'medium'
    },
    isNavOpen: false
});

// Helper to create custom elements with state management
export function withState(BaseClass) {
    return class extends BaseClass {
        constructor() {
            super();
            this._stateUnsubscribe = null;
        }

        connectedCallback() {
            if (super.connectedCallback) {
                super.connectedCallback();
            }
            
            this._stateUnsubscribe = store.subscribe(state => {
                if (this.onStateChange) {
                    this.onStateChange(state);
                }
            });
        }

        disconnectedCallback() {
            if (this._stateUnsubscribe) {
                this._stateUnsubscribe();
            }
            if (super.disconnectedCallback) {
                super.disconnectedCallback();
            }
        }
    };
}
