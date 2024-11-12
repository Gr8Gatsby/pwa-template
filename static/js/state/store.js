// Simple state management system
class Store {
    constructor(initialState = {}) {
        this._state = initialState;
        this._subscribers = new Set();
        this._history = [];
        this._maxHistoryLength = 100;

        // Load persisted state from localStorage if available
        this._loadPersistedState();
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

        // Keep history length in check
        if (this._history.length > this._maxHistoryLength) {
            this._history.shift();
        }
        
        this._state = newState;
        this._notifySubscribers();
        
        // Persist state changes to localStorage
        this._persistState();
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
            case 'SET_ERROR':
                return { ...state, error: action.payload };
            case 'CLEAR_ERROR':
                const { error, ...restState } = state;
                return restState;
            case 'UPDATE_UI_STATE':
                return { ...state, ui: { ...state.ui, ...action.payload } };
            default:
                return state;
        }
    }

    _notifySubscribers() {
        this._subscribers.forEach(callback => callback(this.state));
    }

    _persistState() {
        try {
            const persistedState = {
                theme: this._state.theme,
                preferences: this._state.preferences
            };
            localStorage.setItem('pwa_app_state', JSON.stringify(persistedState));
        } catch (err) {
            console.warn('Failed to persist state:', err);
        }
    }

    _loadPersistedState() {
        try {
            const savedState = localStorage.getItem('pwa_app_state');
            if (savedState) {
                const parsedState = JSON.parse(savedState);
                this._state = {
                    ...this._state,
                    ...parsedState
                };
            }
        } catch (err) {
            console.warn('Failed to load persisted state:', err);
        }
    }

    // For debugging
    getHistory() {
        return [...this._history];
    }

    // Get current state size
    getStateSize() {
        return new Blob([JSON.stringify(this._state)]).size;
    }
}

// Create and export store instance
export const store = new Store({
    theme: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
    preferences: {
        animations: true,
        fontSize: 'medium',
        reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches
    },
    isNavOpen: false,
    ui: {
        isMobileMenuOpen: false,
        isLoading: false,
        activeSection: 'home'
    }
});

// Helper to create custom elements with state management
export function withState(BaseClass) {
    return class extends BaseClass {
        constructor() {
            super();
            this._stateUnsubscribe = null;
            this._boundOnStateChange = this.onStateChange.bind(this);
        }

        connectedCallback() {
            if (super.connectedCallback) {
                super.connectedCallback();
            }
            
            // Subscribe to state changes with bound method
            this._stateUnsubscribe = store.subscribe(this._boundOnStateChange);
            
            // Initialize with current state
            if (this.onStateChange) {
                this.onStateChange(store.state);
            }
        }

        disconnectedCallback() {
            if (this._stateUnsubscribe) {
                this._stateUnsubscribe();
                this._stateUnsubscribe = null;
            }
            if (super.disconnectedCallback) {
                super.disconnectedCallback();
            }
        }
    };
}
