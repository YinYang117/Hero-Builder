import { useState, createContext } from 'react';

export const AbilContext = createContext();

export const AbilProvider = props => {
	const [showAbilPortraits, setShowAbilPortraits] = useState(false);
	const [buildingNewAbil, setBuildingNewAbil]		= useState(false);
	const [editingAbil, setEditingAbil]				= useState(false);
	const [abilImage, setAbilImage]					= useState();
    const [currAbil, setCurrAbil]					= useState();

    const abilStockImages = [
		"https://res.cloudinary.com/dzrimpg5t/image/upload/v1652916118/thorn_pre75p.png",
		"https://res.cloudinary.com/dzrimpg5t/image/upload/v1652916069/heart_c6dviy.png",
		"https://res.cloudinary.com/dzrimpg5t/image/upload/v1652916050/skeleton_r4ltjc.png",
		"https://res.cloudinary.com/dzrimpg5t/image/upload/v1652916038/eagle_cmscmd.png",
		"https://res.cloudinary.com/dzrimpg5t/image/upload/v1652916024/mind-control_sktr3s.png",
		"https://res.cloudinary.com/dzrimpg5t/image/upload/v1652916009/fire_byq2jw.png",
		"https://res.cloudinary.com/dzrimpg5t/image/upload/v1652915993/spell-book_1_oanfuh.png",
		"https://res.cloudinary.com/dzrimpg5t/image/upload/v1652915948/smoke_gagzui.png",
		"https://res.cloudinary.com/dzrimpg5t/image/upload/v1652913887/magic_gnchct.png",
		"https://res.cloudinary.com/dzrimpg5t/image/upload/v1652913875/spell-book_n27jh7.png",
		"https://res.cloudinary.com/dzrimpg5t/image/upload/v1652913823/fireball_vrtuhf.png",
		"https://res.cloudinary.com/dzrimpg5t/image/upload/v1653279273/potion_odfiv5.png",
		"https://res.cloudinary.com/dzrimpg5t/image/upload/v1653279105/imgbin-vexel-warrior-viking-warrior-PEdh5hsWarj0RELPuR83iME82_dbypid.jpg",
		"https://res.cloudinary.com/dzrimpg5t/image/upload/v1653279293/fire_1_r9m4bl.png",
		"https://res.cloudinary.com/dzrimpg5t/image/upload/v1653279325/freeze_sbc9am.png",
		"https://res.cloudinary.com/dzrimpg5t/image/upload/v1653279346/ice_p2bllg.png",
		"https://res.cloudinary.com/dzrimpg5t/image/upload/v1653279363/shield_ujq6pl.png",
	]


    return (
        <AbilContext.Provider
            value={{ abilStockImages, currAbil, setCurrAbil, abilImage, setAbilImage, editingAbil, setEditingAbil, buildingNewAbil, setBuildingNewAbil, showAbilPortraits, setShowAbilPortraits }}
        >
            {props.children}
        </AbilContext.Provider>
    )
}