import React, { useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';
import { fetchUserHeros } from "../../store/heros"
import { fetchUserAbilities } from "../../store/abilities"
import { fetchHeroAbilities } from "../../store/heroAbil"
import { HeroContext } from '../../context/HeroContext';
import HeroDetailsCard from '../Hero'; 
import NewHeroForm from '../Hero/newHero.js'
import EditHeroForm from '../Hero/editingHero.js'
import HeroFrame from "./heroFrame"
import NewHeroImages from "./newHeroImages"
import "./home.css"


const Home = () => {
	const dispatch 	= useDispatch();

	const user 		= useSelector(state => state.session.user)
	const heros 	= useSelector(state => state.heros)
	const allAbils	= useSelector(state => state.abilities)

	const { currHero, setCurrHero, images } = useContext(HeroContext);
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
	]

	const [showAbils, setShowAbils] 		= useState(false);
	const [editingHero, setEditingHero] 	= useState(false)
	const [currSelAbil, setCurrSelAbil] 	= useState()
	const [buildNewHero, setBuildNewHero] 	= useState(false)
	const [buildNewAbil, setBuildNewAbil] 	= useState(false)
	const [newHeroImage, setNewHeroImage] 	= useState()
	const [selHeroAbilNum, setSelHeroAbilNum] = useState(0)

	useEffect(() => {
		if (user) {
			dispatch(fetchUserHeros(user))
			console.log("just about to fetch abilities")
			dispatch(fetchUserAbilities(user))
		} else <Redirect to='/' />
	}, [user])

	useEffect(() => {
		if (currHero) {
			setSelHeroAbilNum(currHero.numOfAbilities)
			dispatch(fetchHeroAbilities(currHero))
		}
	}, [currHero])

	const showAllHeros = () => {
		setCurrHero()
		setBuildNewHero(false)
	}

	const startNewHero = () => {
		setEditingHero(false)
		setCurrHero()
		setBuildNewHero(!buildNewHero)
	}

	const startNewAbil = () => {
		setEditingHero(false)
		setCurrHero()
		setBuildNewAbil(!buildNewAbil)
	}

	const showAllAbilButton = () => {
		setShowAbils(!showAbils)
	}

	const setCurrSelAbilFunc = (abil) => {
		setCurrSelAbil(abil)
	}

	return (
		<div className="homebody">
			<div className="jccen w100">
				{user && <h1>
					Welcome Hero Builder {user.username}!
				</h1>}
			</div>
			<div className="homeMainContainer">
				<div className="lgrid">
					<button type="button"
						className="hcp showAllButton" // TODO Bad classname
						onClick={startNewHero}
					>
						Build Hero
					</button>
					<button type="button"
						className="showAllButton hcp"
						onClick={showAllHeros}
					>
						All Heros
					</button>
					{heros &&
					<div>
						{heros?.arr?.map(hero => (
							<div key={hero.id} className="heroNamePlate hcp" onClick={e => setCurrHero(hero)}>
								{hero.name}
							</div>
						))}
					</div>}
				</div>
				<div className="cgrid">
					{/* small hero images container */}
					<div className="heroDisplay">
						{heros && !currHero && !buildNewHero &&
						heros?.arr?.map(hero => (
							<HeroFrame key={hero.id} hero={hero} />
						))}
						{/* same area displays hero image choices */}
						{buildNewHero && images && !currHero && 
						images?.map((img, i) => (
							<NewHeroImages key={i} img={img} i={i} setNewHeroImage={setNewHeroImage} />
						))}
					</div>
					{currHero && !editingHero && !buildNewHero &&
						<HeroDetailsCard
						hero={currHero}
						setCurrHero={setCurrHero}
						heroAbil={selHeroAbilNum}
						editingHero={editingHero}
						setEditingHero={setEditingHero}
					/>}
					{editingHero && currHero && !buildNewHero &&
						<EditHeroForm
						hero={currHero}
						heroAbil={selHeroAbilNum}
						editingHero={editingHero}
						setEditingHero={setEditingHero}
					/>}
					{buildNewHero && !editingHero && !currHero &&
						<NewHeroForm
						buildNewHero={buildNewHero}
						setBuildNewHero={setBuildNewHero}
						newHeroImage={newHeroImage}
					/>}
					<div className="Selected ability details">
						details on a selected ability
					</div>
					<div className="heroDisplay">
						{allAbils && showAbils && allAbils?.arr?.map(abil => (
							<div key={abil.id} className="could do a component card here">
								<img src={abil.abilityImage} alt={abil.name}
									className="abilImgCarousel hcp"
									
								/>
								<div>{abil.name}</div>
							</div>
						))}
					</div>
					{currSelAbil && 
					<div className="heroDisplay">
						{currSelAbil.name}
					</div>}
				</div>
				<div className="rgrid">
					<button type="button"
						className="showAllButton"
						// TODO this className is very basic
						onClick={startNewAbil}
					>
						Build new Ability
					</button>
					<button type="button"
						className="showAllButton"
						// TODO this className is very basic
						onClick={showAllAbilButton}
					>
						Show all Abilities
					</button>
				</div>
			</div>
		</div>
	)
}

export default Home;