 import Post from "../models/Post.js";
 import User from "../models/User.js";
 
//  export const createPost = async (req, res) => {

//     try{
//         const { userId, desctiption , picturePath } = req.body;
//         const user = await User.findById(userId);

//         const newPost = new Post({
//             userId,
//             firstName: user.firstName,
//             lastName: user.lastName,
//             desctiption,
//             picturePath,
//             userPicturePath: user.picturePath,
//             picturePath,
//             likes: {},
//             comments: [],
//             })
//             await newPost.save();

//             const post = await Post.findById(newPost._id); //get all post
//             res.status(201).json(post);


//     }catch(err){
//         res.status(409).json({message: err.message});
//     }
// };

export const createPost = async (req, res) => {
    try {
      const { userId, description, picturePath } = req.body;
      const user = await User.findById(userId);
      const newPost = new Post({
        userId,
        firstName: user.firstName,
        lastName: user.lastName,
        location: user.location,
        description: description,
        userPicturePath: user.picturePath,
        picturePath: picturePath,
        likes: {},
        comments: [],
      });
      await newPost.save();
  
      const post = await Post.find();
      res.status(201).json(post);
    } catch (err) {
      res.status(409).json({ message: err.message });
    }
  };
  

export const getFeedPosts = async (req, res) => {
    try{
       //fetch by recent post
        const post = await Post.find().sort({"createdAt": -1});
        res.status(200).json(post);
        


    }catch(err){
        res.status(404).json({message: err.message});
        
    }
};

export const getUserPosts = async (req, res) => {
    try{
        const { userId } = req.params;
        const post = await Post.find({userId});
        
        res.status(200).json(post);
        }
    catch(err){
        res.status(404).json({message: err.message});
    }
};
 
/*UPDATE*/
export const likePost = async (req, res) => {
    try{
        const { id} = req.params;
        const { userId } = req.body;
        const post = await Post?.findById(id);
       
        const isliked = post.likes.get(userId);
        console.log(isliked);
        
        if (isliked){
            post.likes.delete(userId);
        }
        else{
            post.likes.set(userId, true);
        }
        const updatedPost = await Post.findByIdAndUpdate(
            id, 
            {likes: post.likes},
            {new: true}
            
            );
        res.status(200).json(updatedPost);



        // res.status(200).json({message: "likePost"});
    }catch(err){
        res.status(404).json({message: err.message});
    }
};
export const commentPost = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId, comment } = req.body;
        const post = await Post.findById(id);
        post.comments.push({ userId, comment });
        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { comments: post.comments },
            { new: true }
        );
        res.status(200).json(updatedPost);

        
    } catch (error) {
        res.status(404).json({ message: error.message });
        
    }
}