const LOAD_HERO_ABILS = "heroAbil/loadHeroAbils"

// CONSTANTS
/////////////////////////////////////////
// action creators

const loadHeroAbilities = (abils) => {
    return {
        type: LOAD_HERO_ABILS,
        payload: abils
    }
}

// end of actions
/////////////////////////////////////////
// thunks

export const fetchHeroAbilities = (hero) => async (disptach) => {
    const { id } = hero.id
    const res = await fetch(`/api/hero_abil/${id}`);

    if (res.ok) {
        const data = await res.json();
        disptach(loadHeroAbilities(data))
    } else if (res.status < 500) {
        const data = await res.json();
        if (data.errors) return data.errors; // no possible errors returned on this route atm.
    } else return ['An error occurred. Please try again.']
}

// end of thunks
/////////////////////////////////////////
// reducer

const initialState = {};
const heroAbilReducer = (state = initialState, action) => {
    let newState = Object.assign({}, state)
    switch (action.type) {
        case LOAD_HERO_ABILS:
            newState = action.payload
            newState.arr = Object.values(action.payload)
            return newState
        default:
            return state;
    }
}


export default heroAbilReducer;