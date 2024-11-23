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
	pgm.createTable('bookingsources', {
		id: 'id',
		title: {type: 'varchar(100)', notNull: true}
	});


	

	pgm.createTable('roomtype', {
		id: 'id',
		title: {type: 'varchar(50)', notNull: true},
		bedtype: {type: 'varchar(10)'},
		abbreviation: {type: 'varchar(5)', notNull: true}
	});


	pgm.createTable('reviews', {
		id: 'id',
		title: {type: 'varchar(50)', notNull: true},
		rating: {type: 'integer', length: "3"},
		notes: {type:'text'}
	});




	pgm.createTable('bookings', {
		id: 'id',
		rate: {type: 'real', notNull: true},
		adult_count: {type: 'integer', notNull: true, default: "1"},
		child_count: {type: 'integer', notNull: true, default: "0"},
		state: {type: 'integer', notNull: true, default: "0"},
		company_id: {
			type: 'integer', 
			notNull: true, 
			references: '"company"',
			onDelete: 'cascade',
			onUpdate: 'restrict'
		},
		booking_customer_id: {
			type: 'integer',
			notNull: true,
			references: '"user"',
			onDelete: 'cascade',
			onUpdate: 'restrict'
		},
		booking_method: {
			type: 'varchar(30)',
			notNull: true
		},
		booking_source_id: {
			type: 'integer',
			notNull: true,
			references: '"bookingsources"',
			onDelete: 'cascade',
			onUpdate: 'restrict'
		},
		booked_by: {
			type: 'integer',
			allowNull: true
		},
		balance: {type: 'float', notNull: true},
		before_forecast_balance: {type: 'float', allowNull: true},
		invoice_hash: {type: 'varchar(30)', notNull: true},
		use_rate_plan: {type: 'integer', notNull: true, default: "0"},
		rate_plan_id: {type: 'integer', allowNull: true},
		color: {type: 'varchar(10)', notNull: true, default: "transparent"},
		currency_id: {
			type: 'integer',
			notNull: true,
			references: '"currencies"',
			onDelete: 'cascade',
			onUpdate: 'restrict'		
		},
		room_type_id: {
			type: 'integer',
			notNull: true,
			references: '"roomtype"',
			onDelete: 'cascade',
			onUpdate: 'restrict'	
		},
		review_id: {
			type: 'integer',
			notNull: true,
			references: '"reviews"',
			onDelete: 'cascade',
			onUpdate: 'restrict'
		},
		is_deleted: {
			type: 'integer',
			length: 2,
			notNull: true,
			default: "0"
		}
	});

	
	
	pgm.createIndex('bookings', 'company_id');
	pgm.createIndex('bookings', 'booking_customer_id');
	pgm.createIndex('bookings', 'booking_source_id');
	pgm.createIndex('bookings', 'currency_id');
	pgm.createIndex('bookings', 'room_type_id');
	pgm.createIndex('bookings', 'review_id');

};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {

	pgm.dropTable('company')
};

exports.down = (pgm) => {

	pgm.dropTable('bookingsources')
};

exports.down = (pgm) => {

	pgm.dropTable('currencies')
};


exports.down = (pgm) => {

	pgm.dropTable('roomtype')
};

exports.down = (pgm) => {

	pgm.dropTable('reviews')
};

exports.down = (pgm) => {

	pgm.dropTable('bookings')
};




