import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchUserHeros } from "../../store/heros"
import { fetchUserAbilities } from "../../store/abilities"
import { fetchHeroAbilities } from "../../store/heroAbil"
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
	const [selectedHero, setSelectedHero] = useState({})
	const [selHeroAbilNum, setSelHeroAbilNum] = useState(0)
	// const [herosArr, setHerosArr] = useState([])


	useEffect(() => {
		dispatch(fetchUserHeros(user))
		dispatch(fetchUserAbilities(user))
	}, [user])

	useEffect(() => {
		setSelHeroAbilNum(selectedHero.numOfAbilities)
		dispatch(fetchHeroAbilities(selectedHero))
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
						{heros.arr.map(hero => (
							<div key={hero.name} className="rectangle name bar like categories in HotS">
								{hero.name}
							</div>
						))}
					</div>}
				</div>
				<div className="2/3 middle main area">
					<div className="hero display">
						{heros && showHeros && heros.arr.map(hero => (
							<div key={hero.id} className="could do a component card here">
								<img src={hero.heroImage} alt={hero.name}>
									<div className="display like a title, or bottom left">{hero.name}</div>
								</img>
								<p className="under image">{hero.intro}</p>
							</div>
						))}
					</div>
					<div className="little space">
							<div className="container for specific hero's abils">
								{/* fancy logic for drag drop.
								and for selectedHero . num abil
								 */}
							</div>
					</div>
					<div className="ability display">
						{heros && showHeros && heros.arr.map(hero => (
							<div key={hero.id} className="could do a component card here">
								<img src={hero.heroImage} alt={hero.name}>
									<div className="display like a title, or bottom left">{hero.name}</div>
								</img>
								<p className="under image">{hero.intro}</p>
							</div>
						))}
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