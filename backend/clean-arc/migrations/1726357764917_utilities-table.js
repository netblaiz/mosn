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

	pgm.createTable('role', {
		id: 'id',
		title: {
			type: 'varchar(50)', 
			notNull: true
		},
		description: {type: 'varchar(150)', allowNull: true}
	}); 



	pgm.createTable('currencies', {
		currencyid: 'id',
		currencycode: {type: 'varchar(3)', notNull: true},
		currencyname: {type: 'varchar(50)', notNull: true},
		currencysymbol: {type: 'varchar(5)', allowNull: true}
	});


		pgm.createTable('languages', {
		languageid: 'id',
		languagecode: {type: 'varchar(3)', notNull: true},
		languagename: {type: 'varchar(50)', notNull: true}
	});

};



/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {};
