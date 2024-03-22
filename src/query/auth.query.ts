export const AUTH_QUERY = {
    SELECT_USERS: 'SELECT * FROM users ORDER BY created_at DESC LIMIT 50',
    SELECT_USER: 'SELECT * FROM users WHERE id = ?',
    CREATE_USER: 'INSERT INTO users(first_name, last_name, username, email, password, status) VALUES (?, ?, ?, ?, ?, ?);',
    UPDATE_USER: 'UPDATE users SET first_name = ?, last_name = ?, username = ?, email = ?, password = ?, status = ? WHERE id = ?',
    DELETE_USER: 'DELETE FROM users WHERE id = ?',
    SELECT_USER_BY_EMAIL: 'SELECT * FROM users WHERE email = ?'
};
