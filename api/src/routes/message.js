const router = require("express").Router();
const Conversation = require("../models/Conversation");
const Message = require("../models/Message");

//add with conversation

router.post("/", async (req, res) => {
  // const idConv = (await req.body.conversationId.length)
  //   ? req.body.conversationId
  //   : null;
  // const conversation = await Conversation.findById(idConv);
  // console.log(idConv);
  // if (conversation) {
  //   console.log("ada");
  // }
  // if (!conversation) {
  //   console.log("gak ada");
  // }
  try {
    // if (conversation) {
    const newMessage = await new Message({
      conversationId: req.body.conversationId,
      sender: req.body.sender,
      text: req.body.text,
    });
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
    console.log("id ada");
    // }
    // if (!conversation) {
    //   console.log("id tidak ada");
    //   const newConversation = new Conversation({
    //     members: [req.body.sender, req.body.receiverId],
    //   });
    //   const savedConversation = await newConversation.save();
    //   console.log(
    //     savedConversation,
    //     "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<"
    //   );
    //   const newMessage = await new Message({
    //     conversationId: savedConversation._id,
    //     sender: req.body.sender,
    //     text: req.body.text,
    //   });
    //   const savedMessage = await newMessage.save();
    //   res.status(200).json(savedMessage);
    // }
  } catch (err) {
    res.status(500).json(err);
  }
});

//get

router.get("/:conversationId", async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
