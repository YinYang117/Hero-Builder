import React, { useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';
import { fetchUserHeros } from "../../store/heros"
import { fetchUserAbilities } from "../../store/abilities"
import { fetchHeroAbilities } from "../../store/heroAbil"
import { HeroContext } from '../../context/SelectedHero';
import HeroDetailsCard from '../Hero';
import HeroFrame from "./heroFrame"
import "./home.css"


const Home = () => {
	const dispatch = useDispatch();
	const heros = useSelector(state => state.heros)
	// console.log(heros.arr)
	const allAbils = useSelector(state => state.abilities)
	const user = useSelector(state => state.session.user)
	const { currHero, setCurrHero } = useContext(HeroContext);
	const [showHeros, setShowHeros] = useState(false);
	const [showAbils, setShowAbils] = useState(false);
	const [selHeroAbilNum, setSelHeroAbilNum] = useState(0)
	// const [herosArr, setHerosArr] = useState([])
	
	console.log("current hero", currHero)

	useEffect(() => {
		console.log(user)
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
		setShowHeros(!showHeros)
	}

	// useEffect(() => {
	// 	setHerosArr(Object.values(heros))
	// },[heros]) // rebuilt in store. might be able to keep sorted easier that way??? maybe...

	return (
		<div className="homebody">
			<h1>
				Welcome Hero Builder!
			</h1>
			<div className="homeMainContainer">
				<div className="lgrid">
					<button type="button"
						className="showAllButton"
						onClick={showAllHeros}
					>
						Show Heros
					</button>
					{heros && showHeros &&
					<div className="hero list of names container">
						{heros.arr.map(hero => (
							<div key={hero.id} className="heroNamePlate">
								{hero.name}
							</div>
						))}
					</div>}
					<div className='heroNamePlate'>list of hero nameplates</div>
				</div>
				<div className="cgrid">
					<div>Larger hero image carasole</div>
					<div className="heroDisplay">
					{/* 
					Here, when you select a hero, all the other heros displayed
					disappear, and hero details open in this same spot.
					you can change the hero details by clicking a new hero
					from the list on the left, or clicking all heros again.
					 */}
						{showHeros && heros && !currHero &&
						heros.arr.map(hero => (
							<HeroFrame  key={hero.id} hero={hero} />
						))}
					</div>
					{currHero && 
						<HeroDetailsCard hero={currHero} heroAbil={selHeroAbilNum} />
					}
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