import { MemberModel } from '../models/memberModel.js';

export const MemberController = {
  async getAllMembers(req, res) {
    try {
      const members = await MemberModel.getAll();
      res.json(members);
    } catch (err) { res.status(500).json({ error: err.message }); }
  },
  async getMemberById(req, res) {
    try {
      const member = await MemberModel.getById(req.params.id);
      if (!member) return res.status(404).json({ error: 'Anggota tidak ditemukan' });
      res.json(member);
    } catch (err) { res.status(500).json({ error: err.message }); }
  },
  async registerMember(req, res) {
    try {
      const newMember = await MemberModel.create(req.body);
      res.status(201).json({ message: "Anggota berhasil didaftarkan!", data: newMember });
    } catch (err) { res.status(400).json({ error: err.message }); }
  },
  async updateMember(req, res) {
    try {
      const updatedMember = await MemberModel.update(req.params.id, req.body);
      res.json(updatedMember);
    } catch (err) { res.status(400).json({ error: err.message }); }
  },
  async deleteMember(req, res) {
    try {
      const response = await MemberModel.delete(req.params.id);
      res.json(response);
    } catch (err) { res.status(500).json({ error: err.message }); }
  }
};
