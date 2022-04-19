const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, '名稱'],
    },
    price: {
      type: Number,
      required: [true, '價格'],
    },
    rating: {
      type: Number,
      required: [true, '評價'],
    },
    createdAt: {
      type: Date,
      default: Date.now,
      select: false, // false => find() 無法找出
    },
  },
  {
    versionKey: false, // 移除 _v
    // timestamps: true,  // 自動加入 createdAt、updatedAt
  },
);

const Room = mongoose.model('rooms', roomSchema);

module.exports = Room;
