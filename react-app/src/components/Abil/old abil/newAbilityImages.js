import React from 'react';
import './home.css';

const NewAbilityImages = ({img, i, setNewAbilityImage}) => {

	const selectImage = () => {
		setNewAbilityImage(img)
	}

	return (
		<>
			<div className="hcp heroFrame fdcol"
			onClick={selectImage}
			>
			{/* TODO change classname and css details */}
				<img src={img} alt={`ability choice ${i}`} className="heroFrameImg" />
			</div>
		</>
	)
}

export default NewAbilityImages;