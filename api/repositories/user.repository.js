const UserModel = require("../models/user.model");

const UserRepository = {
  async findAll() {
    return await UserModel.findAll();
  },
  async findById(id) {
    return await UserModel.findByPk(id);
  },
  async findByEmail(email) {
    return await UserModel.findOne({ where: { email } });
  },
  async create(data) {
    return await UserModel.create(data);
  },
  async update(id, data) {
    const user = await UserModel.findByPk(id);
    if (!user) return null;
    return await user.update(data);
  },
  async delete(id) {
    const user = await UserModel.findByPk(id);
    if (!user) return null;
    await user.destroy();
    return true;
  },
};

module.exports = UserRepository;
