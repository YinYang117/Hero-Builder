import React from 'react';
import './home.css';

const NewHeroImages = ({img, i, setNewHeroImage}) => {

	const selectImage = () => {
		setNewHeroImage(img)
	}

	return (
		<>
			<div className="hcp heroFrame fdcol"
			onClick={selectImage}
			>
				<img src={img} alt={`hero choice ${i}`} className="heroFrameImg" />
			</div>
		</>
	)
}

export default NewHeroImages;