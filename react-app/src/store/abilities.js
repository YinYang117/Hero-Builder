const LOAD_USER_ABILITIES = "abilities/loadAllUserAbilities"
const LOAD_SINGLE_ABIL = "abilities/loadSingleAbil"
const REMOVE_ABIL = 'abilibies/removeAbil'

// CONSTANTS
/////////////////////////////////////////
// action creators

const loadUserAbilities = (abils) => {
    return {
        type: LOAD_USER_ABILITIES,
        payload: abils
    }
}

const loadAbil = (abil) => {
    return {
        type: LOAD_SINGLE_ABIL,
        payload: abil
    }
}

const removeAbil = (id) => {
    return {
        type: REMOVE_ABIL,
        payload: id
    }
}

// end of actions
/////////////////////////////////////////
// thunks

export const buildAbil = (abil) => async (dispatch) => {
    const res = await fetch('/api/abilities/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(abil)
        });

    if (res.ok) {
        const data = await res.json();
        dispatch(loadAbil(data))
    } else if (res.status < 500) {
        const data = await res.json(); 
        if (data.errors) return data.errors;
    } else {
        const data = await res.json();
        data.errors.push(['A server error occurred.'])
        return data.errors;
    }    
}

export const fetchUserAbilities = (user) => async (dispatch) => {
    const id = user.id
    const res = await fetch(`/api/abilities/user/${id}`);

    if (res.ok) {
        const data = await res.json();
        dispatch(loadUserAbilities(data))
    } else if (res.status < 500) {
        const data = await res.json();
        if (data.errors) return data.errors;
    } else return ['An error occurred. Please try again.']
}

export const editAbil = (abil) => async (dispatch) => {
    const id = abil.id
    const res = await fetch(`/api/abilities/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(abil)
        });

    if (res.ok) {
        const data = await res.json();
        dispatch(loadAbil(data))
    } else if (res.status < 500) {
        const data = await res.json();
        if (data.errors) return data.errors;
    } else {
        const data = await res.json();
        data.errors.push(['A server error occurred.'])
        return data.errors;
    }
}

export const deleteAbil = (id) => async (dispatch) => {
    const res = await fetch(`/api/abilities/${id}`, {
        method: "DELETE"
    })

    if (res.ok) dispatch(removeAbil(id))
    else if (res.status < 500) {
        const data = await res.json();
        if (data.errors) return data.errors;
    } else {
        const data = await res.json();
        data.errors.push(['A server error occurred.'])
        return data.errors;
    }
}

// end of thunks
/////////////////////////////////////////
// reducer

const initialState = {};
const abilityReducer = (state = initialState, action) => {
    let newState = Object.assign({}, state)
    switch (action.type) {
        case LOAD_USER_ABILITIES:
            newState = action.payload
            delete newState.arr
            newState.arr = Object.values(newState)
            return newState
        case LOAD_SINGLE_ABIL:
            newState[action.payload.id] = action.payload
            delete newState.arr
            newState.arr = Object.values(newState)
            return newState
        case REMOVE_ABIL:
            delete newState[action.payload]
            delete newState.arr
            newState.arr = Object.values(newState)
            return newState
        default:
            return state;
    }
}

export default abilityReducer;