"use strict";

/*
 * List apps
 */

function getApps(req, res) {
	res.send({ apps: [ { name: 'JaxNode Console JNN'}] });
}

module.exports = getApps;