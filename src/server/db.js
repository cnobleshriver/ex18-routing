/**
 * Counter Management Module
 *
 * This module provides a set of asynchronous functions for creating, reading,
 * updating, and deleting counter documents in a PouchDB database. It includes
 * utilities for manipulating individual counters by name, modifying counter
 * values, and fetching all counters stored in the database. The module is built
 * on top of PouchDB, a NoSQL database, to persist counter data.
 *
 * HOWEVER: it can easily be changed to a different data store simply by
 * replacing the PouchDB implementation with another database system.
 *
 * Functions:
 * - `saveCounter(name, count)`: Saves a new counter or updates an existing
 *   counter with the given name and count.
 * - `modifyCounter(doc)`: Updates an existing counter document in the database.
 * - `loadCounter(name)`: Retrieves a counter by its name.
 * - `removeCounter(name)`: Removes a counter from the database by its name.
 * - `loadAllCounters()`: Fetches all counters from the database.
 *
 * Dependencies:
 * - PouchDB: Used for data storage and retrieval operations. Ensure PouchDB is
 *   installed and properly configured.
 *
 * Examples of use:
 * - Creating a counter with a specific name and initial count.
 * - Updating the count of an existing counter.
 * - Fetching the current count of a counter by its name.
 * - Deleting a counter.
 * - Listing all counters stored in the database.
 *
 * Note: This module is currently works with a PouchDB database named
 * 'counters'. Make sure the database is accessible and correctly initialized
 * before using these functions.
 *
 * Note: This module can easily change the database implementation to another
 * database system by changing the import statement and the database connection
 * initialization. The rest of the functions should work as expected with minor
 * modifications.
 */
import PouchDB from "pouchdb";

const db = new PouchDB("counters");

/**
 * Asynchronously saves a new counter to the database with a specified name and
 * count. If a counter with the same name already exists, it will be
 * overwritten.
 *
 * @async
 * @param {string} name - The unique identifier for the counter.
 * @param {number} count - The initial count value for the counter.
 * @returns {Promise<void>} - A promise that resolves when the counter has been
 * successfully saved.
 * @throws {Error} - Throws an error if the operation fails, e.g., due to
 * database connectivity issues.
 */
export async function saveCounter(name, count) {
  await db.put({ _id: name, count });
}

/**
 * Asynchronously modifies an existing counter in the database. The counter
 * document must include an `_id` property that matches the counter's name in
 * the database.
 *
 * @async
 * @param {Object} doc - The counter document to be updated. Must include `_id`
 * and `count` properties.
 * @returns {Promise<void>} - A promise that resolves when the counter has been
 * successfully modified.
 * @throws {Error} - Throws an error if the operation fails, e.g., the counter
 * does not exist or database issues.
 */
export async function modifyCounter(doc) {
  await db.put(doc);
}

/**
 * Asynchronously retrieves a counter from the database by its name.
 *
 * @async
 * @param {string} name - The name of the counter to retrieve.
 * @returns {Promise<Object>} - A promise that resolves to the counter document.
 * @throws {Error} - Throws an error if the counter cannot be found or if there
 * is a database issue.
 */
export async function loadCounter(name) {
  const counter = await db.get(name);
  return counter;
}

/**
 * Asynchronously removes a counter from the database by its name.
 *
 * @async
 * @param {string} name - The name of the counter to be removed.
 * @returns {Promise<void>} - A promise that resolves when the counter has been
 * successfully removed.
 * @throws {Error} - Throws an error if the counter cannot be removed, e.g., it
 * does not exist or due to database issues.
 */
export async function removeCounter(name) {
  db.remove(name);
}

/**
 * Asynchronously retrieves all counters from the database.
 *
 * @async
 * @returns {Promise<Array<Object>>} - A promise that resolves to an array of
 * counter documents.
 * @throws {Error} - Throws an error if there is a problem accessing the
 * database.
 */
export async function loadAllCounters() {
  const result = await db.allDocs({ include_docs: true });
  return result.rows.map((row) => row.doc);
}
