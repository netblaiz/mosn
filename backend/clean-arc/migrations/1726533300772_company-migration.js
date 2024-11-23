/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {

		pgm.createTable('facilities', {
		id: 'id',
		facility_title: {type: 'varchar(50)', notNull: true},
		facility_code: {type: 'varchar(10)', allowNull: true}
	});

		pgm.createTable('company', {
		id: 'id',
		company_name: {type: 'varchar(100)', notNull: true},
		company_address: {type: 'varchar(50)', notNull: true},
		city_id: {type: 'integer', notNull: true},
		logo: {type: 'varchar(30)', allowNull: true},
		company_email: {type: 'varchar(50)', notNull: true, unique: true},
		ext1: {type: 'integer', notNull: true},
		ext2: {type: 'integer', allowNull: true},
		phone1: {type: 'integer',  notNull: true, unique: true},
		phone2: {type: 'integer',  allowNull: true, unique: true},
		website:{type:'varchar(100)', allowNull: true},
		timeZone: {type: 'varchar(150)', notNull: true},
		postalCode: {type: 'varchar(15)', notNull: true},
		sellingDate: {type: 'date', allowNull: true},
		apiKey: {type: 'varchar(30)', notNull: true}

	});


pgm.createTable('facility', {
		id: 'id',
		name: {type: 'varchar(100)', notNull: true},
		address: {type: 'varchar(50)', notNull: true},
		facility_type: {
			type: 'integer',
			notNull: true, 
			references: '"facilities"',
			onDelete: 'cascade',
			onUpdate: 'restrict'
		},
		longitude: {type: 'decimal', allowNull: true},
		latitude: {type: 'decimal', allowNull: true},
		city: {type: 'varchar(100)', notNull: true},
		state: {type: 'varchar(100)', notNull: true},
		logo: {type: 'varchar(30)', allowNull: true},
		propertyHash: {
			type: 'varchar(30)', 
			notNull: true,
			unique: true,
		},
		owner_id: {
			type: 'integer',
			notNull: true
		},
		email: {type: 'varchar(50)', notNull: true, unique: true},
		company_id: {
			type: 'integer', 
			notNull: true,
			references: '"company"',
			onDelete: 'cascade',
			onUpdate: 'restrict'
		},
		number_of_rooms: {type: 'integer', notNull: true, default: "1"},
		ext1: {type: 'integer', notNull: true},
		ext2: {type: 'integer', allowNull: true},
		phone1: {type: 'integer',  notNull: true, unique: true},
		phone2: {type: 'integer',  allowNull: true, unique: true},
		website:{type:'varchar(100)', allowNull: true},
		timezone: {type: 'varchar(150)', notNull: true},
		postal_code: {type: 'varchar(15)', notNull: true},
		selling_date: {type: 'date', allowNull: true},
		apiKey: {type: 'varchar(30)', notNull: true}

	});



	pgm.createTable('company_owner', {
		id: 'id',
		company_id: {
			type: 'integer', 
			notNull: true
		},
		createdAt: {type: 'timestamp', notNull: true},
		modifiedAt: {type: 'timestamp', notNull: true, default: pgm.func('current_timestamp')}
	});

};






/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {};
