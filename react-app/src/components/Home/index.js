import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';
import { fetchUserHeros } from "../../store/heros"
import { fetchUserAbilities } from "../../store/abilities"
import { fetchHeroAbilities } from "../../store/heroAbil"
import HeroDetailsCard from '../Heros';
import "./home.css"


const Home = () => {
	const dispatch = useDispatch();
	const heros = useSelector(state => state.heros)
	// console.log(heros.arr)
	const allAbils = useSelector(state => state.abilities)
	// console.log(allAbils.arr)
	const user = useSelector(state => state.user)
	const [showHeros, setShowHeros] = useState(false);
	const [showAbils, setShowAbils] = useState(false);
	const [selectedHero, setSelectedHero] = useState()
	const [selHeroAbilNum, setSelHeroAbilNum] = useState(0)
	// const [herosArr, setHerosArr] = useState([])


	useEffect(() => {
		if (user) {
			dispatch(fetchUserHeros(user))
			dispatch(fetchUserAbilities(user))
		} else <Redirect to='/' />
	}, [user])

	useEffect(() => {
		if (selectedHero) {
			setSelHeroAbilNum(selectedHero.numOfAbilities)
			dispatch(fetchHeroAbilities(selectedHero))
		}
	},[selectedHero])

	// useEffect(() => {
	// 	setHerosArr(Object.values(heros))
	// },[heros]) // rebuilt in store. might be able to keep sorted easier that way??? maybe...

	return (
		<div className="homebody">
			<h1>
				Welcome Hero Builder!
			</h1>
			<div className="divide into 3">
				<div className="1/3 left column centered">
					<button type="button"
						className="Show all heros"
						onClick={setShowHeros(true)}
					>
						Show Heros
					</button>
					{showHeros && <div className="hero list of names container">
						{heros?.arr?.map(hero => (
							<div key={hero.name} className="rectangle name bar like categories in HotS">
								{hero.name}
							</div>
						))}
					</div>}
				</div>
				<div className="2/3 middle main area">
					<div className="hero display">
					{/* 
					Here, when you select a hero, all the other heros displayed
					disappear, and hero details open in this same spot.
					you can change the hero details by clicking a new hero
					from the list on the left, or clicking all heros again.
					 */}
						{heros && showHeros && heros?.arr?.map(hero => (
							<div key={hero.id} className="could do a component card here">
								<img src={hero.heroImage} alt={hero.name}>
									<div className="display like a title, or bottom left">{hero.name}</div>
								</img>
								<p className="under image">{hero.intro}</p>
							</div>
						))}
						{selectedHero && 
						<HeroDetailsCard hero={selectedHero} heroAbil={selHeroAbilNum} />
						}
					</div>
					<div className="little space">
							<div className="container for specific hero's abils">
								{/* fancy logic for drag drop.
								and for selectedHero . num abil
								 */}
							</div>
					</div>
					<div className="ability display">
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
								{/* 
								under here im thinking it will display the details of an
								ability that you select from the all ability menu
								 */}
					</div>
					<div className="Selected ability details">

					</div>
				</div>
				<div className="3/3 right">
					<button type="button"
						className="Show all abilities"
						onClick={setShowAbils(true)}
					>
						Show all Abilities
					</button>
				</div>
			</div>
		</div>
	)
}

export default Home;