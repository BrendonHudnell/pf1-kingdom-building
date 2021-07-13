import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { KingdomEntity } from '../kingdom';

@Entity('hex')
export class HexEntity {
	@PrimaryGeneratedColumn()
	id!: number;

	@ManyToOne(() => KingdomEntity, (kingdom) => kingdom.hexes)
	kingdom!: KingdomEntity;

	@Column({ length: 255 })
	name!: string;

	@Column({ length: 9 })
	terrain!: string;

	@Column()
	bridgeSpecialTerrain!: boolean;

	@Column()
	building!: boolean;

	@Column()
	freeCity!: boolean;

	@Column()
	lair!: boolean;

	@Column()
	landmark!: boolean;

	@Column()
	resource!: boolean;

	@Column()
	river!: boolean;

	@Column()
	ruin!: boolean;

	@Column({ length: 10 })
	explorationState!: string;

	@Column()
	aqueduct!: boolean;

	@Column()
	bridgeImprovement!: boolean;

	@Column()
	canal!: boolean;

	@Column()
	farm!: boolean;

	@Column()
	fishery!: boolean;

	@Column()
	fort!: boolean;

	@Column()
	highway!: boolean;

	@Column()
	mine!: boolean;

	@Column()
	quarry!: boolean;

	@Column()
	road!: boolean;

	@Column()
	sawmill!: boolean;

	@Column()
	vineyard!: boolean;

	@Column()
	watchtower!: boolean;

	@Column({ type: 'text', nullable: true })
	pointsOfInterest?: string;

	@Column({ type: 'text', nullable: true })
	notes?: string;
}
