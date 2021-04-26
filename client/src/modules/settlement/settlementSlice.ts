import {
	createAsyncThunk,
	createEntityAdapter,
	createSlice,
	EntityId,
	PayloadAction,
} from '@reduxjs/toolkit';

import { RootState } from '../../components/store';
import { initialSettlements } from './settlementUtils';

export interface Settlement {
	id: EntityId;
	name: string;
	hexId: EntityId;
	districts: EntityId[];
}

const settlementAdapter = createEntityAdapter<Settlement>();

const initialState = settlementAdapter.getInitialState();

export const fetchSettlements = createAsyncThunk(
	// TODO fix when server is hooked up
	'settlement/fetchSettlements',
	async () => {
		return initialSettlements;
	}
);

export const addNewSettlement = createAsyncThunk(
	// TODO fix when server is hooked up
	'settlement/addNewSettlement',
	async ({
		hexId,
		settlementId,
	}: {
		hexId: EntityId;
		settlementId: EntityId;
	}) => {
		const newSettlement: Settlement = {
			id: settlementId,
			name: `Settlement ${settlementId}`,
			hexId,
			districts: [],
		};

		return newSettlement;
	}
);

export const settlementSlice = createSlice({
	name: 'settlement',
	initialState,
	reducers: {
		nameUpdated: (
			state,
			action: PayloadAction<{ settlementId: EntityId; name: string }>
		) => {
			const { settlementId, name } = action.payload;

			const settlement = state.entities[settlementId];

			if (settlement) {
				settlement.name = name;
			}
		},
	},
	extraReducers: (builder) => {
		builder.addCase(
			fetchSettlements.fulfilled,
			(state, action: PayloadAction<Settlement[]>) => {
				settlementAdapter.setAll(state, action.payload);
			}
		),
			builder.addCase(
				addNewSettlement.fulfilled,
				(state, action: PayloadAction<Settlement>) => {
					settlementAdapter.addOne(state, action.payload);
				}
			);
	},
});

export const { nameUpdated } = settlementSlice.actions;

export const {
	selectAll: selectAllSettlements,
	selectById: selectSettlementById,
} = settlementAdapter.getSelectors<RootState>((state) => state.settlement);

export const settlementReducer = settlementSlice.reducer;
