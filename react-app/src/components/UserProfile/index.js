import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useSelector } from "react-redux";

export default function UserProfilePage() {
	const user = useSelector(state => state.session.user);


	return (
		<>
			{user &&
				<Card sx={{ maxWidth: 345 }}>
					<CardActionArea>
						<CardMedia
							component="img"
							height="140"
							image="/static/images/cards/contemplative-reptile.jpg"
							alt="green iguana"
						/>
						<CardContent>
							<Typography gutterBottom variant="h5" component="div">
								{user.username}
							</Typography>
							<Typography variant="body2" color="text.secondary">
								This is a space about you. All your personal information.
								Not sure what all you'd want to put here though.
							</Typography>
						</CardContent>
					</CardActionArea>
				</Card>
			}
			{!user &&
				<CardMedia
					component="img"
					height="1040"
					image="https://cdn.thenewstack.io/media/2017/08/d3219c59-teapot.png"
					alt="I am not a teapot"
				/>
			}
		</>
	);
}
