/**
 * Loads the state from localStorage
 * @returns {Object} The loaded state
 */
export const loadState = () => {
	try {
		const serializedState = localStorage.getItem("state");
		if (serializedState === null) {
			return undefined;
		}

		return JSON.parse(serializedState);
	} catch (err) {
		return undefined;
	}
};

/**
 * Saves a state to localStorage
 * @param {Object} state The state to store
 * @returns {void}
 */
export const saveState = state => {
	const serializedState = JSON.stringify(state);
	localStorage.setItem("state", serializedState);
};
