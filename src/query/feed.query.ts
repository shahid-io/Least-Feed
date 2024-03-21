export const FEED_QUERY = {
    SELECT_FEEDS: 'SELECT * FROM feeds ORDER BY created_at DESC LIMIT 50',
    SELECT_FEED: 'SELECT * FROM feeds WHERE id = ?',
    CREATE_FEED: 'INSERT INTO feeds(author, meta_title, meta_desc, title, description, status, image_url) VALUES (?, ?, ?, ?, ?, ?, ?);',
    UPDATE_FEED: 'UPDATE feeds SET author = ?, meta_title = ?, meta_desc = ?, title = ?, description = ?, status = ?, image_url = ? WHERE id = ?',
    DELETE_FEED: 'DELETE FROM feeds WHERE id = ?'
};
