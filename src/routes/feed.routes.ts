import { Router } from "express"
import { getFeeds, getFeed, createFeed, updateFeed, deleteFeed } from '../controllers/feed.controller';

const feedRoutes = Router();

feedRoutes.route('/').get(getFeeds).post(createFeed);
feedRoutes.route('/:feedId').get(getFeed).put(updateFeed).delete(deleteFeed);

export default feedRoutes;