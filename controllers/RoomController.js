import Room from "../models/Room.js";

export const createRoom = async (req, res, next) => {
 
  try {
    const newRoom = await new Room(req.body);
    console.log(req.body)
    const saveRoom  = await newRoom.save();
    res.status(200).json(saveRoom);
  } catch (err) {
    console.log(err);
    // next(err);
  }
};

export const updateRoom = async (req, res, next) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedRoom);
  } catch (err) {
    next(err);
  }
};
export const updateRoomAvailability = async (req, res, next) => {
  try {
    const {roomId , newStatus} = req.body
    await Room.updateOne({_id:roomId}, {$set:{status: newStatus}});
    res.status(200).json("Room status has been updated.");
  } catch (err) {
    next(err);
  }
};
export const deleteRoom = async (req, res, next) => {
  try {
    await Room.findByIdAndDelete(req.params.id);
    res.status(200).json("Room has been deleted.");
  } catch (err) {
    next(err);
  }
};
export const getRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    res.status(200).json(room);
  } catch (err) {
    next(err);
  }
};
export const getRooms = async (req, res, next) => {
  try {
    let query = {};

    // Lọc theo số lượng người (nếu có)
    if (req.query.maxPeople) {
      query.maxPeople = { $gte: parseInt(req.query.maxPeople) }; // Chuyển đổi thành số nguyên
    }

    // Lọc theo trạng thái của phòng (nếu có)
    if (req.query.status) {
      query.status = req.query.status;
    }

    // Kiểm tra xem có tham số truy vấn nào được truyền vào không
    if (Object.keys(req.query).length === 0) {
      const rooms = await Room.find();
      return res.status(200).json(rooms);
    }

    // Truy vấn cơ sở dữ liệu và trả về danh sách các phòng phù hợp với điều kiện
    const rooms = await Room.find(query);
    res.status(200).json(rooms);
  } catch (err) {
    next(err);
  }
};
