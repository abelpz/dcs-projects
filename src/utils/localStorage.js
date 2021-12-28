export function loadState({key, user, strict}) {
  try {
    const lastUser = localStorage.getItem(key + '_lastuser')
    if (!lastUser && !user) return
    const serializedState = localStorage.getItem(key + '_' + (user || lastUser));
    if (!serializedState) return
    const loadedState = JSON.parse(serializedState)
    if (strict) {
      return loadedState.settings.saveToken ? loadedState : undefined
    }
    return loadedState
  } catch (e) {
    return undefined;
  }
}

export async function saveState(key, state) {
  try {
    const username = state?.auth?.user?.username
    if (!username) return
    
    const newState = state.settings.saveToken ? state : {
      ...state,
      auth: {
        ...state.auth,
        token: null,
      }
    }
    const serializedState = JSON.stringify(newState);
    const userStateKey = key + '_' + username
    const lastUserKey = key + '_lastuser'
    localStorage.setItem(lastUserKey, username)
    localStorage.setItem(userStateKey, serializedState);
  } catch (e) {
    // Ignore
  }
}