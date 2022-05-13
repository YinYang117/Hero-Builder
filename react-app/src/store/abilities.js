const LOAD_USER_ABILITIES = "heros/loadAllUserAbilities"

// CONSTANTS
/////////////////////////////////////////
// action creators

const loadUserAbilities = (abilities) => {
    return {
        type: LOAD_USER_ABILITIES,
        payload: abilities
    }
}

// end of actions
/////////////////////////////////////////
// thunks

export const fetchUserAbilities = (user) => async (disptach) => {
    const { id } = user.id
    const res = await fetch(`/api/abilities/user/${id}`);

    if (res.ok) {
        const data = await res.json();
        disptach(loadUserAbilities(data))
    } else if (res.status < 500) {
        const data = await res.json();
        if (data.errors) return data.errors;
    } else return ['An error occurred. Please try again.']
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
            newState.arr = Object.values(action.payload)
            return newState
        default:
            return state;
    }
}


export default abilityReducer;