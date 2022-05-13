const LOAD_USER_HEROS = "heros/loadAllUserHeros"
const LOAD_SINGLE_HERO = "heros/loadSingleHero"

// CONSTANTS
/////////////////////////////////////////
// action creators

const loadUserHeros = (heros) => {
    return {
        type: LOAD_USER_HEROS,
        payload: heros
    }
}

const heroEdits = (hero) => {
    return {
        type: LOAD_SINGLE_HERO,
        payload: hero
    }
}

// end of actions
/////////////////////////////////////////
// thunks

export const fetchUserHeros = (user) => async (disptach) => {
    const { id } = user.id
    const res = await fetch(`/api/heros/user/${id}`);

    if (res.ok) {
        const data = await res.json();
        disptach(loadUserHeros(data))
    } else if (res.status < 500) {
        const data = await res.json();
        if (data.errors) return data.errors;
    } else return ['An error occurred. Please try again.']
}


export const fetchHeroEdit = (user) => async (disptach) => {
    const { id } = user.id
    const res = await fetch(`/api/heros/user/${id}`);

    if (res.ok) {
        const data = await res.json();
        disptach(loadUserHeros(data))
    } else if (res.status < 500) {
        const data = await res.json();
        if (data.errors) return data.errors;
    } else return ['An error occurred. Please try again.']
}

// end of thunks
/////////////////////////////////////////
// reducer

const initialState = {};
const heroReducer = (state = initialState, action) => {
    let newState = Object.assign({}, state)
    switch (action.type) {
        case LOAD_USER_HEROS:
            newState = action.payload
            newState.arr = Object.values(action.payload)
            return newState
        case LOAD_SINGLE_HERO:
            newState[action.payload.id] = action.payload
            return newState
        default:
            return state;
    }
}


export default heroReducer;