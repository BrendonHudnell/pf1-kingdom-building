import React, { Fragment, ReactElement } from 'react';
import {
	Box,
	Checkbox,
	FormControlLabel,
	Grid,
	makeStyles,
	TextField,
	Typography,
} from '@material-ui/core';
import { EntityId } from '@reduxjs/toolkit';

import { useAppDispatch, useAppSelector } from '../../components/store';
import {
	nameUpdated,
	pavedUpdated,
	selectDistrictById,
	sewersUpdated,
} from './districtSlice';
import { DistrictTerrainType } from './districtUtils';
import { LotGridRow } from './lotGridRow';
import { DistrictBorderGrid } from './districtBorderGrid';

const useStyles = makeStyles({
	dirt: {
		background: 'tan',
	},
	paved: {
		background: 'grey',
	},
	sewers: {
		background: 'darkslategray',
	},
	pavedAndSewers: {
		background: `repeating-linear-gradient(
			45deg,
			grey,
			grey 30px,
			darkslategray 30px,
			darkslategray 60px
		)`,
	},
});

export interface DistrictViewProps {
	districtId: EntityId;
}

export function DistrictView(props: DistrictViewProps): ReactElement {
	const { districtId } = props;

	const classes = useStyles();

	const dispatch = useAppDispatch();

	const district = useAppSelector((state) =>
		selectDistrictById(state, districtId)
	);

	const usedLots = district?.lotIds.filter((lot) => lot !== -1).length ?? 0;

	const terrainNorth =
		district?.north.terrain === DistrictTerrainType.CLIFF
			? 'lightgray'
			: district?.north.terrain === DistrictTerrainType.WATER
			? 'blue'
			: 'green';
	const terrainSouth =
		district?.south.terrain === DistrictTerrainType.CLIFF
			? 'lightgray'
			: district?.south.terrain === DistrictTerrainType.WATER
			? 'blue'
			: 'green';
	const terrainEast =
		district?.east.terrain === DistrictTerrainType.CLIFF
			? 'lightgray'
			: district?.east.terrain === DistrictTerrainType.WATER
			? 'blue'
			: 'green';
	const terrainWest =
		district?.west.terrain === DistrictTerrainType.CLIFF
			? 'lightgray'
			: district?.west.terrain === DistrictTerrainType.WATER
			? 'blue'
			: 'green';

	const fortificationNorth =
		district?.north.wall && district.north.moat
			? 'darkblue'
			: district?.north.wall
			? 'gray'
			: district?.north.moat
			? 'lightblue'
			: 'transparent';
	const fortificationSouth =
		district?.south.wall && district.south.moat
			? 'darkblue'
			: district?.south.wall
			? 'gray'
			: district?.south.moat
			? 'lightblue'
			: 'transparent';
	const fortificationEast =
		district?.east.wall && district.east.moat
			? 'darkblue'
			: district?.east.wall
			? 'gray'
			: district?.east.moat
			? 'lightblue'
			: 'transparent';
	const fortificationWest =
		district?.west.wall && district.west.moat
			? 'darkblue'
			: district?.west.wall
			? 'gray'
			: district?.west.moat
			? 'lightblue'
			: 'transparent';

	const backgroundClass =
		district?.paved && district?.sewers
			? classes.pavedAndSewers
			: district?.paved
			? classes.paved
			: district?.sewers
			? classes.sewers
			: classes.dirt;

	return (
		<Fragment>
			{district ? (
				<Grid container spacing={2} alignItems="center">
					<Grid container item spacing={2} alignItems="center">
						<Grid item>
							<TextField
								value={district.name}
								onChange={(e) =>
									dispatch(nameUpdated({ districtId, name: e.target.value }))
								}
							/>
						</Grid>
						<Grid item>
							<Typography>Used Lots: {usedLots}</Typography>
						</Grid>
						<Grid item>
							<Typography>Free Lots: {36 - usedLots}</Typography>
						</Grid>
						<Grid item>
							<FormControlLabel
								control={
									<Checkbox
										checked={district.paved}
										onChange={(e) =>
											dispatch(
												pavedUpdated({ districtId, paved: e.target.checked })
											)
										}
									/>
								}
								label="Paved Roads"
							/>
						</Grid>
						<Grid item>
							<FormControlLabel
								control={
									<Checkbox
										checked={district.sewers}
										onChange={(e) =>
											dispatch(
												sewersUpdated({ districtId, sewers: e.target.checked })
											)
										}
									/>
								}
								label="Sewers"
							/>
						</Grid>
					</Grid>
					<DistrictBorderGrid
						district={district}
						name="North"
						direction="north"
					/>
					<DistrictBorderGrid
						district={district}
						name="South"
						direction="south"
					/>
					<DistrictBorderGrid
						district={district}
						name="East"
						direction="east"
					/>
					<DistrictBorderGrid
						district={district}
						name="West"
						direction="west"
					/>
				</Grid>
			) : null}
			{district ? (
				<Box
					marginTop={3}
					border={24}
					style={{
						borderLeftColor: fortificationEast,
						borderRightColor: fortificationWest,
						borderTopColor: fortificationNorth,
						borderBottomColor: fortificationSouth,
					}}
				>
					<Box
						border={24}
						style={{
							borderLeftColor: terrainEast,
							borderRightColor: terrainWest,
							borderTopColor: terrainNorth,
							borderBottomColor: terrainSouth,
						}}
					>
						<Grid className={backgroundClass} container>
							<LotGridRow
								district={district}
								inclusiveStart={0}
								exclusiveEnd={6}
							/>
							<LotGridRow
								district={district}
								inclusiveStart={6}
								exclusiveEnd={12}
							/>
							<LotGridRow
								district={district}
								inclusiveStart={12}
								exclusiveEnd={18}
							/>
							<LotGridRow
								district={district}
								inclusiveStart={18}
								exclusiveEnd={24}
							/>
							<LotGridRow
								district={district}
								inclusiveStart={24}
								exclusiveEnd={30}
							/>
							<LotGridRow
								district={district}
								inclusiveStart={30}
								exclusiveEnd={36}
							/>
						</Grid>
					</Box>
				</Box>
			) : null}
		</Fragment>
	);
}
