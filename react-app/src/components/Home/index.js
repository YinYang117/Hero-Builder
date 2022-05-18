import React, { useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';
import { fetchUserHeros } from "../../store/heros"
import { fetchUserAbilities } from "../../store/abilities"
import { fetchHeroAbilities } from "../../store/heroAbil"
import { HeroContext } from '../../context/HeroContextCont';
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

	const [showAbils, setShowAbils] 		= useState(false);
	const [editingHero, setEditingHero] 	= useState(false)
	const [buildNewHero, setBuildNewHero] 	= useState(false)
	const [newHeroImage, setNewHeroImage] 	= useState()
	const [selHeroAbilNum, setSelHeroAbilNum] = useState(0)

	useEffect(() => {
		if (user) {
			dispatch(fetchUserHeros(user))
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
						className="hcp"
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
					<div className="ability display">
						ability display for all other abils
						{allAbils && showAbils && allAbils?.arr?.map(abil => (
							<div key={abil.id} className="could do a component card here">
								<img src={abil.heroImage} alt={abil.name}>
									<div className="display like a title, or bottom left">{abil.name}</div>
								</img>
								<p className="under image">{abil.intro}</p>
							</div>
						))}
					</div>
					<div className="little space">
					spacer
								{/* 
								under here im thinking it will display the details of an
								ability that you select from the all ability menu
								 */}
					</div>
					<div className="Selected ability details">
						details on a selected ability
					</div>
				</div>
				<div className="rgrid">
					<button type="button"
						className="showAllButton"
						// onClick={setShowAbils(true)}
					>
						Show all Abilities
					</button>
				</div>
			</div>
		</div>
	)
}

export default Home;