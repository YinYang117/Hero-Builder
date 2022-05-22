const LOAD_HERO_ABILS = "heroAbil/loadHeroAbils"
const LOAD_ONE_ABIL = "heroAbil/loadOneAbil"
const REMOVE_ONE_ABIL = "heroAbil/removeOneAbil"

// CONSTANTS
/////////////////////////////////////////
// action creators

const loadHeroAbilities = (abils) => {
    return {
        type: LOAD_HERO_ABILS,
        payload: abils
    }
}

const loadOneAbil = (abil) => {
    return {
        type: LOAD_ONE_ABIL,
        payload:abil
    }
}

const removeOneAbil = (id) => {
    return {
        type: REMOVE_ONE_ABIL,
        payload: id
    }
}

// end of actions
/////////////////////////////////////////
// thunks

export const fetchHeroAbilities = (hero) => async (dispatch) => {
    console.log("heroAbil store hero", hero)
    const idStr = hero.id
    const id = parseInt(idStr, 10)
    const res = await fetch(`/api/hero_abil/${id}`);

    if (res.ok) {
        const data = await res.json();
        console.log("heroAbil store res ok", data)
        dispatch(loadHeroAbilities(data))
    } else if (res.status < 500) {
        const data = await res.json();
        if (data.errors) return data.errors;
    } else {
        const data = await res.json();
        data.errors.push(['A server error occurred.'])
        return data.errors;
    }
}

export const addOneHeroAbil = (hero, abil) => async (dispatch) => {
    const heroId = hero.id;
    const abilId = abil.id
    const res = await fetch(`/api/hero_abil/${heroId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(abilId)
        });

    if (res.ok) {
        const data = await res.json();
        console.log("store heroAbil add one data", data)
        dispatch(loadOneAbil(abil))
    } else if (res.status < 500) {
        const data = await res.json();
        if (data.errors) return data.errors;
    } else {
        const data = await res.json();
        data.errors.push(['A server error occurred.'])
        return data.errors;
    }
}

export const deleteOneHeroAbil = (hero, abil) => async (dispatch) => {
    const heroId = hero.id;
    const abilId = abil.id
    const res = await fetch(`/api/hero_abil/${heroId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(abilId)
        });

    if (res.ok) {
        dispatch(removeOneAbil(abilId))
    } else if (res.status < 500) {
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
const heroAbilReducer = (state = initialState, action) => {
    let newState = Object.assign({}, state)
    switch (action.type) {
        case LOAD_HERO_ABILS:
            newState = action.payload
            delete newState.arr
            newState.arr = Object.values(newState)
            return newState
        case LOAD_ONE_ABIL:
            newState[action.payload.id] = action.payload
            delete newState.arr
            newState.arr = Object.values(newState)
            return newState
        case REMOVE_ONE_ABIL:
            delete newState[action.payload]
            delete newState.arr
            newState.arr = Object.values(newState)
            return newState
        default:
            return state;
    }
}

export default heroAbilReducer;