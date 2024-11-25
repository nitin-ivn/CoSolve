import express from "express";
import { addNewPost, getAllPost, getPostsByCategory, getMyPost, getUserPosts, addComment, getCommentsOfPost, deletePost, bookmarkPost, editPostStatus, addPostToOngoing, removePostFromOngoing, getPost, addRatingToReview, removePostFromCompleted, addPostToCompleted } from "../controllers/post.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

router.route('/addpost').post(isAuthenticated, upload.single('image'), addNewPost);
router.route('/getposts').get(getAllPost);
router.route('/getposts/category').get(getPostsByCategory);
router.route('/getmyposts').get(isAuthenticated, getMyPost);
router.route('/:id/getuserposts').get(getUserPosts);
router.route('/:id/addcomment').post(isAuthenticated, addComment);
router.route('/:id/getcomments').get(getCommentsOfPost);
router.route('/:id/delete').delete(isAuthenticated, deletePost);
router.route('/:id/bookmark').get(isAuthenticated, bookmarkPost);
router.route('/:id/status').put(isAuthenticated, editPostStatus);
router.route('/:id/addongoing').put(isAuthenticated, addPostToOngoing);
router.route('/:id/removeongoing').put(isAuthenticated, removePostFromOngoing);
router.route('/:id/rating').put(isAuthenticated, addRatingToReview);//here removes from ongoing and adds to completed
router.route('/:id/addcompleted').put(isAuthenticated, addPostToCompleted);
router.route('/:id/removecompleted').put(isAuthenticated, removePostFromCompleted);
router.route('/:id/getpost').get(getPost);

export default router;
