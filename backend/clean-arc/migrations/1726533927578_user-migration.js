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

	pgm.createTable('auth', {
		id: 'id',
		username: {type: 'varchar(30)', notNull: true, unique: true},
		email: {type: 'varchar(100)', notNull: true, unique: true},
		password: {type: 'varchar(200)', notNull: true},
		isPartner: {type: 'integer', default: "0"},
		userHash: {type: 'uuid', unique: true, notNull: true},
		activated: {type: 'integer', default: "0"},
		banned: {type: 'integer', default: "0"},
		banReason: {type: 'varchar(1000)', allowNull: true},
		newPasswordKey: {type: 'varchar(50)', allowNull: true},
		newPasswordRequested: {type: 'timestamp', allowNull: true},
		activationEmailKey: {type: 'varchar(50)', notNull: true},
		emailKeyRequested: {type: 'varchar(50)', notNull: true},
		qrcode: {type: 'varchar(50)', notNull: true},
		lastIP: {type: 'varchar(50)', notNull: true},
		lastLogin: {type: 'timestamp'},
		createdAt: {type: 'timestamp', notNull: true},
		modifiedAt: {type: 'timestamp', notNull: true, default: pgm.func('current_timestamp')},
		acceptTOS: {type: 'int', default: "0"},
		dateTOS: {type: 'timestamp', allowNull: true},
		isactive: {type: 'boolean', default: true}
	});


	pgm.createTable('user', {
		id: 'id',
		title: {type: 'integer', notNull: true},
		firstname: {type: 'varchar(50)', notNull: true},
		lastname: {type: 'varchar(50)', notNull: true},
		middlename: {type: 'varchar(50)', notNull: true},
		password: {type: 'varchar(200)', notNull: true},
		avatar: {type: 'varchar(10)', allowNull: true},
		signature: {type: 'varchar(10)', allowNull: true},
		auth_id: {
			type: 'integer', 
			notNull: true,
			unique: true,
			references: '"auth"',
			onDelete: 'cascade',
			onUpdate: 'restrict'
		},
		email: {type: 'varchar(50)', notNull: true, unique: true},
		ext: {type: 'integer', notNull: true},
		ext2: {type: 'integer', notNull: true},
		phone1: {type: 'integer',  notNull: true, unique: true},
		allowPhoneDisplay: {type: 'integer',  notNull: true},
		nationality: {type: 'varchar(50)', allowNull: true},
		state: {type: 'varchar(50)', allowNull: true},
		city: {type: 'varchar(50)', allowNull: true},
		language_id: {
			type: 'integer', 
			notNull: true,
			references: '"languages"',
			onDelete: 'cascade',
			onUpdate: 'restrict'
		},
		currency: {
			type: 'integer',
			notNull: true,
			references: '"currencies"',
			onDelete: 'cascade',
			onUpdate: 'restrict'
		},
		current_company_id: {
			type: 'integer', 
			notNull: true,
			references: '"company"',
			onDelete: 'cascade',
			onUpdate: 'restrict'
		},
		current_role: {
			type: 'integer',
			notNull: true,
			references: '"role"',
			onDelete: 'cascade',
			onUpdate: 'restrict'
		},
	});   

	pgm.createTable('user_role', {
		id: 'id',
		user_id: {
			type: 'integer', 
			notNull: true,
			references: '"user"',
			onDelete: 'cascade',
			onUpdate: 'restrict'
		},
		role_id: {
			type: 'integer', 
			notNull: true,
			references: '"role"',
			onDelete: 'cascade',
			onUpdate: 'restrict'
		},
		createdAt: {type: 'timestamp', notNull: true},
		modifiedAt: {type: 'timestamp', notNull: true, default: pgm.func('current_timestamp')}
	}); 

	pgm.createIndex('user', 'auth_id');
	pgm.createIndex('user', 'language_id');
	pgm.createIndex('user', 'currency');
	pgm.createIndex('user', 'current_role');
	pgm.createIndex('user', 'current_company_id');
	pgm.createIndex('user_role', 'user_id');
	pgm.createIndex('user_role', 'role_id');


};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
	pgm.dropTable('user')
};

exports.down = (pgm) => {
	pgm.dropTable('auth')
};


