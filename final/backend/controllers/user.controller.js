import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
import { Post } from "../models/post.model.js";

export const register = async (req, res) => {
    try {
        const { username, email, password, phoneNumber, dateOfBirth } = req.body;
        
        // Validating required fields
        if (!username || !email || !password || !phoneNumber || !dateOfBirth) {
            return res.status(400).json({
                message: "Required fields are missing. Please check your input!",
                success: false,
            });
        }

        // Check if the email is already in use
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "Email already in use. Try a different one.",
                success: false,
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user 
        const newUser = await User.create({
            username,
            email,
            phoneNumber,
            password: hashedPassword,
            dateOfBirth,
        });

        return res.status(201).json({
            message: "Account created successfully.",
            success: true,
            userId: newUser._id,  // Optional
        });
    } catch (error) {
        console.error("Error in registration:", error);
        return res.status(500).json({
            message: "An error occurred during registration. Please try again later.",
            success: false,
        });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate required fields
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required!",
                success: false,
            });
        }

        // Check if user exists
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                message: "Incorrect email or password",
                success: false,
            });
        }

        // Validate password
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({
                message: "Incorrect email or password",
                success: false,
            });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '1d' });

        // Populate each post and bookmark if they belong to the user
        const populatedPosts = await Promise.all(
            user.posts.map(async (postId) => {
                const post = await Post.findById(postId);
                if(post.author.equals(user._id)){
                    return post;
                }
                return null;
            })
        );

        const populatedBookmarks = await Promise.all(
            user.bookmarks.map(async (bookmarkId) => {
                const bookmark = await Post.findById(bookmarkId);
                return bookmark ? bookmark : null;
            })
        );

        const populatedOngoing = await Promise.all(
            user.ongoing.map(async (ongoingId) => {
                const ongoingPost = await Post.findById(ongoingId);
                return ongoingPost ? ongoingPost : null;
            })
        );

        const populatedCompleted = await Promise.all(
            user.completed.map(async (completedId) => {
                const completedPost = await Post.findById(completedId);
                return completedPost ? completedPost : null;
            })
        );

        user = {
            _id: user._id,
            username: user.username,
            email: user.email,
            profilePicture: user.profilePicture,
            phoneNumber: user.phoneNumber,
            dateOfBirth: user.dateOfBirth,
            gender: user.gender,
            emergencyContact: user.emergencyContact,
            posts: populatedPosts.filter(Boolean), // Filter out nulls
            bookmarks: populatedBookmarks.filter(Boolean),
            ongoing: populatedOngoing.filter(Boolean),
            completed: populatedCompleted.filter(Boolean),
            ratings: user.ratings,
        };


        // Send response with token and user data
        return res
            .cookie('token', token, { httpOnly: true, sameSite: 'strict', maxAge: 1 * 24 * 60 * 60 * 1000 })
            .json({
                message: `Welcome back, ${user.username}!`,
                success: true,
                user
            });

    } catch (error) {
        console.error("Error in login:", error);
        return res.status(500).json({
            message: "An error occurred during login. Please try again later.",
            success: false,
        });
    }
};

 export const logout = async (_, res) => {
    try {
        return res.cookie("token", "", { maxAge: 0 }).json({
            message: 'Logged out successfully.',
            success: true
        });
    } catch (error) {
        console.error("Error in logout:", error);
        return res.status(500).json({
            message: "An error occurred.Please try again.",
            success: false,
        });
    }
};

export const getProfile = async (req, res) => {
    try {
        const userId = req.params.id;

        // Retrieve user with populated posts and bookmarks
        const user = await User.findById(userId)
            .populate({
                path: 'posts',
                options: { sort: { createdAt: -1 } } // Sort posts by creation date (latest first)
            })
            .populate('bookmarks');

        // Check if user exists
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }

        return res.status(200).json({
            user,
            success: true
        });
    } catch (error) {
        console.error("Error fetching profile:", error);
        return res.status(500).json({
            message: "An error occurred while fetching the profile",
            success: false
        });
    }
};

export const editProfile = async (req, res) => {
    try {
        const userId = req.id;
        const { username, dateOfBirth, phoneNumber, gender, emergencyContact } = req.body;
        const profilePicture = req.file;
        let cloudResponse;


        if (profilePicture) {
            const fileUri = getDataUri(profilePicture);
            cloudResponse = await cloudinary.uploader.upload(fileUri);
        }

        // Find user and exclude password for security
        const user = await User.findById(userId).select('-password');
        if (!user) {
            return res.status(404).json({
                message: 'User not found.',
                success: false
            });
        }

        // Update user fields if they are provided in the request body
        if (username) user.username = username;
        if (dateOfBirth) user.dateOfBirth = dateOfBirth;
        if (phoneNumber) user.phoneNumber = phoneNumber;
        if (gender) user.gender = gender;
        if (emergencyContact) {
            if (emergencyContact.name) user.emergencyContact.name = emergencyContact.name;
            if (emergencyContact.phoneNumber) user.emergencyContact.phoneNumber = emergencyContact.phoneNumber;
        }
        if (profilePicture) user.profilePicture = cloudResponse.secure_url;

        // Save the updated user data
        await user.save();

        return res.status(200).json({
            message: 'Profile updated successfully.',
            success: true,
            user
        });

    } catch (error) {
        console.error("Error updating profile:", error);
        return res.status(500).json({
            message: "An error occurred while updating the profile.",
            success: false
        });
    }
};
